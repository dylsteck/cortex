import { auth } from "@/app/(auth)/auth";
import { authMiddleware, CLANKER_API_URL, redis, fetcher } from "@/lib/utils";

export async function GET(request: Request) {
  const session = await auth();
  const authResponse = authMiddleware(session, request.url, request.headers);
  if (authResponse) {
    return authResponse;
  }

  const url = new URL(`${CLANKER_API_URL}/tokens`);
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page") || "1";
  const sort = "desc";
  const type = "all";
  url.searchParams.append("sort", sort);
  url.searchParams.append("page", page);
  url.searchParams.append("type", type);

  const cacheKey = `clanker:tokens:${sort}=desc&page=${page}&type=${type}`;
  let data = await redis.get(cacheKey);
  if (!data) {
    try {
      data = await fetcher(url.toString());
      await redis.set(cacheKey, JSON.stringify(data), { ex: 30 * 60 });
    } catch (error) {
      return new Response("Failed to fetch data from Clanker API!", { status: 500 });
    }
  } else if (typeof data === "string") {
    data = JSON.parse(data);
  }

  return new Response(JSON.stringify(data), { status: 200 });
}