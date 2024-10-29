import { auth } from "@/app/(auth)/auth";
import { redis } from "@/lib/utils";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    const { url, headers } = request;
    const hostHeader = headers.get("host");
    if (hostHeader !== new URL(url).host) {
      return Response.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(url)}`, url));
    }
  }

  const cacheKey = "events";
  let data = await redis.get(cacheKey);
  if (!data) {
    const response = await fetch("https://beta.events.xyz/api/events");
    if (!response.ok) return new Response("Failed to fetch data from Events.xyz API!", { status: response.status });
    data = await response.json();
    await redis.set(cacheKey, JSON.stringify(data), { ex: 60 * 60 });
  } else if (typeof data === "string") {
    data = JSON.parse(data);
  }

  return new Response(JSON.stringify(data), { status: 200 });
}