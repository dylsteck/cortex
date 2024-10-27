"use client";
import React from 'react';
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";

import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import "react-farcaster-embed/dist/styles.css";

interface CastData {
  publishedAt: number;
  username: string;
  data: {
    text: string;
    image?: string | null;
    embeds?: {
      urls?: any[];
      images?: {
        alt: string;
        url: string;
        type: string;
        media: {
          width: number;
          height: number;
          source: string;
          version: string;
          staticRaster: string;
        };
        sourceUrl: string;
      }[];
      videos?: any[];
      unknowns?: any[];
      groupInvites?: any[];
    } | null;
  };
  replyParentMerkleRoot: string | null;
  threadMerkleRoot: string;
}

interface CastMeta {
  displayName: string;
  avatar: string;
  isVerifiedAvatar: boolean;
  numReplyChildren: number;
  reactions: {
    count: number;
    type: string;
  };
  recasts: {
    count: number;
  };
  watches: {
    count: number;
  };
  replyParentUsername?: {
    fid: number | null;
    username: string | null;
  };
  mentions?: any[] | null;
  tags?: any[];
}

interface Cast {
  body: CastData;
  meta: CastMeta;
  merkleRoot: string;
  uri: string;
}

export function Casts({ casts }: { casts?: Cast[] }) {
  if (!casts) {
    return (
      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="shrink-0 max-h-[350px] w-[400px] p-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="size-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
                <Skeleton className="h-[200px] w-full" />
                <div className="flex space-x-4">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-4 pb-4">
        {casts.map((cast) => (
          <Card key={cast.merkleRoot} className="shrink-0 max-h-[350px] w-[400px] overflow-hidden">
            <div className="h-full">
              <FarcasterEmbed username={cast.body.username} hash={cast.merkleRoot} />
            </div>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}