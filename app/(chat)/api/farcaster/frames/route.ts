import { type FrameActionPayload, type SupportedParsingSpecification, getFrame } from "frames.js";

import { redis } from "@/lib/utils";

function isSpecificationValid(
    specification: unknown
  ): specification is SupportedParsingSpecification {
    return (
      typeof specification === "string" &&
      ["farcaster", "openframes"].includes(specification)
  );
}  

/** Proxies fetching a frame through a backend to avoid CORS issues and preserve user IP privacy */
export async function GET(request: Request): Promise<Response> {
  const searchParams = new URL(request.url).searchParams;
  const url = searchParams.get("url");
  const specification = searchParams.get("specification") ?? "farcaster";

  if (!url) {
    return new Response(JSON.stringify({ message: "Invalid URL" }), { status: 400 });
  }

  if (!isSpecificationValid(specification)) {
    return new Response(JSON.stringify({ message: "Invalid specification" }), { status: 400 });
  }

  const cacheKey = `frame:${url}`;
  let cachedData = await redis.get(cacheKey);

  if (cachedData) {
    let data;
    if (typeof cachedData === "string") {
      data = JSON.parse(cachedData);
    } else {
      data = cachedData;
    }
    return new Response(JSON.stringify(data), { status: 200 });
  }

  try {
    const urlRes = await fetch(url);
    const htmlString = await urlRes.text();

    const result = getFrame({ htmlString, url, specification });
    const resultString = JSON.stringify(result);

    await redis.set(cacheKey, resultString, { ex: 60 * 60 });
    
    return new Response(resultString);
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: (err as Error).message }), { status: 500 });
  }
}

/** Proxies frame actions to avoid CORS issues and preserve user IP privacy */
export async function POST(request: Request): Promise<Response> {
  const searchParams = new URL(request.url).searchParams;
  const body = (await request.json()) as FrameActionPayload;
  const isPostRedirect = searchParams.get("postType") === "post_redirect";
  const isTransactionRequest = searchParams.get("postType") === "tx";
  const postUrl = searchParams.get("postUrl");
  const specification = searchParams.get("specification") ?? "farcaster";

  if (!postUrl) {
    return new Response(null, { status: 400 });
  }

  if (!isSpecificationValid(specification)) {
    return new Response(JSON.stringify({ message: "Invalid specification" }), { status: 400 });
  }

  try {
    const r = await fetch(postUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      redirect: isPostRedirect ? "manual" : undefined,
      body: JSON.stringify(body),
    });

    if (r.status >= 500) {
      return r;
    }

    if (r.status === 302) {
      return new Response(
        JSON.stringify({
          location: r.headers.get("location"),
        }),
        { status: 302 }
      );
    }

    if (r.status >= 400 && r.status < 500) {
      const json = (await r.json()) as { message?: string };

      if ("message" in json) {
        return new Response(JSON.stringify({ message: json.message }), { status: r.status });
      } else {
        return r;
      }
    }

    if (isPostRedirect && r.status !== 302) {
      return new Response(
        JSON.stringify({ message: "Invalid response for redirect button" }),
        { status: 500 }
      );
    }

    if (isTransactionRequest) {
      const transaction = (await r.json()) as JSON;
      return new Response(JSON.stringify(transaction));
    }

    const htmlString = await r.text();

    const result = getFrame({
      htmlString,
      url: body.untrustedData.url,
      specification,
    });

    return new Response(JSON.stringify(result));
  } catch (err) {
    console.error(err);
    return new Response(null, { status: 500 });
  }
}