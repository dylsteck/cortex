import { auth } from "@/app/(auth)/auth";
import { authMiddleware, redis } from "@/lib/utils";

export async function GET(request: Request) {
  const session = await auth();
  const authResponse = authMiddleware(session, request.url, request.headers);
  if (authResponse) {
    return authResponse;
  }

  const sortType = "TIMESTAMP";
  const chainName = "BaseMainnet";
  const graduated = false;
  const nsfw = false;

  const cacheKey = `wow_trending`;
  let data = await redis.get(cacheKey);

  if (!data) {
    const query = `
      query pagesWowHomePageQuery(
        $sortType: WowTrendingType!
        $chainName: EChainName!
        $graduated: Boolean!
        $nsfw: Boolean!
      ) {
        wowTrending(
          trendingType: $sortType
          order: DESC
          chainName: $chainName
          graduated: $graduated
          nsfw: $nsfw
          first: 20
        ) {
          edges {
            node {
              name
              address
              chainId
              description
              creator {
                __typename
                avatar {
                  small
                }
                handle
                walletAddress
                __isNode: __typename
                id
              }
              hasGraduated
              image {
                mimeType
                originalUri
                medium
              }
              video {
                mimeType
                originalUri
              }
              usdPrice
              symbol
              totalSupply
              marketCap
              blockTimestamp
              nsfw
              socialLinks {
                twitter
                discord
                website
                telegram
              }
              __typename
            }
            cursor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          count
        }
      }
    `;
    const variables = {
      sortType,
      chainName,
      graduated,
      nsfw,
    };

    const response = await fetch("https://api.wow.xyz/universal/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      return new Response("Failed to fetch data from GraphQL API!", {
        status: response.status,
      });
    }

    data = await response.json();
    await redis.set(cacheKey, JSON.stringify(data), { ex: 60 * 60 });
  } else if (typeof data === "string") {
    data = JSON.parse(data);
  }

  return new Response(JSON.stringify(data), { status: 200 });
}