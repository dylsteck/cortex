import { auth } from "@/app/(auth)/auth";

export async function GET(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return new Response(JSON.stringify("Unauthorized!"), { status: 401 });
  }

  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify("Query parameter 'q' is required!"), { status: 400 });
  }

  const response = await fetch(`https://searchcaster.xyz/api/search?text=${encodeURIComponent(query)}`, {
  });

  if (!response.ok) {
    return new Response(JSON.stringify("Failed to fetch data from Searchcaster API!"), { status: response.status });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}