/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

import { ToolResponse, ToolResponseHeader, ToolResponseBody, ToolResponseCard } from "@/components/custom/tool-response";
import { WarpcastCastsResponse } from "@/lib/types";

export default function FarcasterCast({ result }: { result: any }) {
  const castsResult = result as WarpcastCastsResponse & { hash: string };
  const cast = castsResult.result.casts.find(item => 
    item.hash === castsResult.hash || item.hash.startsWith(castsResult.hash)
  );

  if (!cast) {
    return (
      <ToolResponse>
        <ToolResponseHeader text="Cast" />
        <div className="text-sm text-gray-500">No cast found.</div>
      </ToolResponse>
    );
  }

  return (
    <ToolResponse>
      <ToolResponseHeader text="Cast" />
      <ToolResponseBody>
        <ToolResponseCard onClick={() => window.open(`https://warpcast.com/~/conversation/${cast.hash}`, '_blank')}>
          <div className="flex items-center space-x-2.5 mb-2">
            <img 
              src={cast?.author?.pfp?.url || ""} 
              alt={cast.author.username || ""} 
              className="rounded-full size-10" 
            />
            <div className="leading-tight">
              <div className="font-medium">{cast.author.displayName}</div>
              <div className="text-xs text-gray-500">@{cast.author.username}</div>
            </div>
          </div>
          <div className="text-xs mt-2">{cast.text}</div>
          <div className="text-xs text-gray-500 mt-2">
            Likes: {cast.reactions.count} 
            {' | '}
            Recasts: {cast.reactions.count}
          </div>
        </ToolResponseCard>
      </ToolResponseBody>
    </ToolResponse>
  );
}