import { auth } from "@/app/(auth)/auth";
import { authMiddleware, EVENTS_API_URL, redis } from "@/lib/utils";

export async function GET(request: Request) {
  const session = await auth();
  const authResponse = authMiddleware(session, request.url, request.headers);
  if (authResponse) {
    return authResponse;
  }

  const { pathname } = new URL(request.url);
  const name = pathname.split("/").pop();

  if (!name) {
    return new Response(JSON.stringify("Query parameter 'name' is required!"), { status: 400 });
  }

  const cacheKey = `events:channel:${name}`
  let data = await redis.get(cacheKey);
  if (!data) {
    const response = await fetch(`${EVENTS_API_URL}/channels/${name}/events`);
    if (!response.ok) return new Response("Failed to fetch data from Events.xyz API!", { status: response.status });
    data = await response.json();
    await redis.set(cacheKey, JSON.stringify(data), { ex: 60 * 60 });
  } else if (typeof data === "string") {
    data = JSON.parse(data);
  }

  return new Response(JSON.stringify(data), { status: 200 });
}