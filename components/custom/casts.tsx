/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

import { NeynarCastV2 } from "@/lib/types";

import { ToolResponse, ToolResponseHeader, ToolResponseBody, ToolResponseCard } from "./tool-response";

export function Casts({ casts }: { casts: NeynarCastV2[] }) {
  const uniqueCasts = Array.from(new Map(casts.map(cast => [cast.hash, cast])).values());

  return (
    <ToolResponse>
      <ToolResponseHeader text="Casts" />
      <ToolResponseBody>
        {uniqueCasts.map((cast) => (
          <ToolResponseCard
            key={cast.hash}
            onClick={() => window.open(`https://warpcast.com/~/conversation/${cast.hash}`, "_blank")}
          >
            <div className="flex items-center space-x-2.5 mb-2">
              <img src={cast.author.pfp_url || ""} alt={cast.author.username || ""} className="rounded-full size-10" />
              <div className="leading-tight">
                <div className="font-medium">{cast.author.display_name}</div>
                <div className="text-xs text-gray-500">@{cast.author.username}</div>
              </div>
            </div>
            <div className="text-xs mt-2">{cast.text}</div>
          </ToolResponseCard>
        ))}
      </ToolResponseBody>
    </ToolResponse>
  );
}