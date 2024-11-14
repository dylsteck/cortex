import { auth } from "@/app/(auth)/auth"
import { authMiddleware, redis } from "@/lib/utils"

export async function GET(request: Request) {
  const session = await auth()
  const authResponse = authMiddleware(session, request.url, request.headers);
  if (authResponse) {
    return authResponse;
  }

  const url = new URL(request.url)
  const query = url.searchParams.get("query")
  const maxResults = parseInt(url.searchParams.get("maxResults") || "10", 10)
  const searchDepth = url.searchParams.get("searchDepth") as 'basic' | 'advanced' || 'basic'
  const includeDomains = url.searchParams.getAll("includeDomains[]")
  const excludeDomains = url.searchParams.getAll("excludeDomains[]")
  const provider = url.searchParams.get("provider") || "tavily"

  if (!query) {
    return new Response("Query parameter is required", { status: 400 })
  }
  if (provider !== "tavily") {
    return new Response("Unsupported provider", { status: 400 })
  }

  const cacheKey = `web_search:${query}:${maxResults}:${searchDepth}:${includeDomains.join(",")}:${excludeDomains.join(",")}:${provider}`
  let data = await redis.get(cacheKey)

  if (!data) {
    const apiKey = process.env.TAVILY_API_KEY
    if (!apiKey) {
      return new Response("TAVILY_API_KEY is not set in the environment variables", { status: 500 })
    }

    const includeImageDescriptions = true
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        max_results: Math.max(maxResults, 5),
        search_depth: searchDepth,
        include_images: true,
        include_image_descriptions: includeImageDescriptions,
        include_answers: true,
        include_domains: includeDomains,
        exclude_domains: excludeDomains
      })
    })

    if (!response.ok) {
      return new Response(`Tavily API error: ${response.status} ${response.statusText}`, { status: response.status })
    }

    const responseData = await response.json()
    const processedImages = includeImageDescriptions
      ? responseData.images
          .map(({ url, description }: { url: string; description: string }) => ({
            url: sanitizeUrl(url),
            description
          }))
          .filter(
            (
              image: { url: string; description: string }
            ): image is { url: string; description: string } =>
              typeof image === "object" &&
              image.description !== undefined &&
              image.description !== ""
          )
      : responseData.images.map((url: string) => sanitizeUrl(url))

    data = {
      ...responseData,
      images: processedImages
    }
    await redis.set(cacheKey, JSON.stringify(data), { ex: 60 * 60 })
  } else if (typeof data === "string") {
    data = JSON.parse(data)
  }

  return new Response(JSON.stringify(data), { status: 200 })
}

function sanitizeUrl(url: string): string {
  try {
    return new URL(url).toString()
  } catch {
    return ""
  }
}