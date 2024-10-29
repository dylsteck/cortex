import { auth } from "@/app/(auth)/auth";

export async function GET(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    const requestUrl = new URL(request.url);
    const hostHeader = request.headers.get("host");

    if (!hostHeader || hostHeader !== requestUrl.host) {
      return Response.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(request.url)}`, request.url));
    }
  }

  const response = await fetch("https://beta.events.xyz/api/events");

  if (!response.ok) {
    return new Response(JSON.stringify("Failed to fetch data from Events.xyz API!"), { status: response.status });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}