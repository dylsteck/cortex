import { auth } from "@/app/(auth)/auth"
import { redis } from "@/lib/utils"

export async function GET(request: Request) {
  const session = await auth()
  if (!session?.user) {
    const { url, headers } = request
    const hostHeader = headers.get("host")
    if (hostHeader !== new URL(url).host) {
      return Response.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(url)}`, url))
    }
  }

  const url = new URL(request.url)
  const cursor = url.searchParams.get("cursor");
  const list = url.searchParams.get("list") ?? 'top';

  const cacheKey = `composer_actions:list:${list}:cursor:${cursor}`
  let data = cacheKey ? await redis.get(cacheKey) : null

  if (!data && cacheKey) {
    const apiUrl = `https://api.warpcast.com/v2/discover-composer-actions?list=${list}&limit=10${cursor ? `&cursor=${cursor}`: ''}`
    const response = await fetch(apiUrl);
    if (!response.ok) return new Response("Failed to fetch data from Warpcast API!", { status: response.status })
    data = await response.json()
    await redis.set(cacheKey, JSON.stringify(data), { ex: 60 * 60 })
  } else if (typeof data === "string") {
    data = JSON.parse(data)
  }

  return new Response(JSON.stringify(data), { status: 200 })
}