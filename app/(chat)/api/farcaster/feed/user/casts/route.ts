import { auth } from "@/app/(auth)/auth";
import { redis } from "@/lib/utils";

export async function GET(request: Request) {
  // const session = await auth();
  // if (!session?.user) {
  //   const { url, headers } = request;
  //   const hostHeader = headers.get("host");
  //   if (hostHeader !== new URL(url).host) {
  //     return Response.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(url)}`, url));
  //   }
  // }

  const url = new URL(request.url);
  const fid = url.searchParams.get("fid");

  if (!fid) {
    return new Response(JSON.stringify("FID parameter is required!"), { status: 400 });
  }

  const cacheKey = `user_casts:${fid}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData && typeof cachedData === 'string') {
    return new Response(JSON.stringify(JSON.parse(cachedData)), { status: 200 });
  }

  const response = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${encodeURIComponent(fid)}`, {
    method: "GET",
    headers: {
      'accept': 'application/json',
      'api_key': 'NEYNAR_EXPLORER'
    }
  });
  if (!response.ok) {
    return new Response(JSON.stringify("Failed to fetch data from Neynar API!"), { status: response.status });
  }

  const data = await response.json();
  await redis.set(cacheKey, JSON.stringify(data), { ex: 3600 });

  return new Response(JSON.stringify(data), { status: 200 });
}