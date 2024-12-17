/* eslint-disable @next/next/no-img-element */
"use client";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { ToolResponse, ToolResponseBody, ToolResponseCard, ToolResponseHeader } from "@/components/custom/tool-response";
import { StreammStream } from "@/lib/types";

export function FarcasterLivestreams({ livestreams }: { livestreams: StreammStream[] }) {
  const liveStreams = livestreams.filter(stream => stream.isLive);
  return (
    <ToolResponse>
      <ToolResponseHeader text="Live Streams" />
      <ToolResponseBody>
        {!liveStreams.length && (
          <div className="text-center text-muted-foreground py-4 w-full">
            No live streams available
          </div>
        )}
        {liveStreams.map(stream => (
          <ToolResponseCard 
            key={stream.streamId} 
            height="max-h-[35vh]"
          >
            <div className="relative w-full rounded-t-xl overflow-hidden">
              {stream.thumbnailId ? (
                <img
                  src={`https://${stream.thumbnailId}.ipfs.w3s.link`}
                  alt={stream.streamTitle}
                  width={400}
                  height={158}
                  className="w-full h-[158px] object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'w-full h-[158px] bg-gray-200 dark:bg-gray-700';
                    e.currentTarget.parentElement?.appendChild(placeholder);
                  }}
                />
              ) : (
                <div className="w-full h-[158px] bg-gray-200 dark:bg-gray-700"></div>
              )}
              <div className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
                LIVE
              </div>
            </div>
            <div className="p-3 flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                {stream.tokenDetails?.imageUrl && (
                  <img
                    src={stream.tokenDetails.imageUrl}
                    alt={stream.tokenDetails.name}
                    className="size-8 rounded-full"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-semibold text-sm truncate max-w-[280px]">
                    {stream.streamTitle}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">{stream.likes} likes</span>
                <Link 
                  href={`https://streamm.tv/live/${stream.creatorId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white dark:bg-neutral-800 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors self-end"
                >
                  <ExternalLinkIcon className="size-4 text-gray-700 dark:text-gray-300" />
                </Link>
              </div>
            </div>
          </ToolResponseCard>
        ))}
      </ToolResponseBody>
    </ToolResponse>
  );
}