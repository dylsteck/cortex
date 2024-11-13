import { auth } from "@/app/(auth)/auth"
import { redis } from "@/lib/utils"

export async function GET(request: Request) {
  // const session = await auth()
  // if (!session?.user) {
  //   const { url, headers } = request
  //   const hostHeader = headers.get("host")
  //   if (hostHeader !== new URL(url).host) {
  //     return Response.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(url)}`, url))
  //   }
  // }

  const url = new URL(request.url)
  const username = url.searchParams.get("username")
  const fid = url.searchParams.get("fid")

  const cacheKey = username ? `user:${username}` : fid ? `user:${fid}` : null
  let data = cacheKey ? await redis.get(cacheKey) : null

  if (!data && cacheKey) {
    const apiUrl = username 
      ? `https://client.warpcast.com/v2/user-by-username?username=${username}`
      : `https://client.warpcast.com/v2/user-by-fid?fid=${fid}`
    const response = await fetch(apiUrl)
    if (!response.ok) return new Response("Failed to fetch data from Warpcast API!", { status: response.status })
    data = await response.json()
    await redis.set(cacheKey, JSON.stringify(data), { ex: 60 * 60 })
  } else if (typeof data === "string") {
    data = JSON.parse(data)
  }

  return new Response(JSON.stringify(data), { status: 200 })
}