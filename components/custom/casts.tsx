/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';

import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface Cast {
  object: string;
  hash: string;
  thread_hash: string;
  parent_hash: string | null;
  parent_url: string | null;
  root_parent_url: string | null;
  parent_author: {
    fid: number | null;
  };
  author: {
    object: string;
    fid: number;
    username: string;
    display_name: string;
    pfp_url: string;
    custody_address: string;
    profile: {
      bio: {
        text: string;
      };
    };
    follower_count: number;
    following_count: number;
    verifications: string[];
    verified_addresses: {
      eth_addresses: string[];
      sol_addresses: string[];
    };
    verified_accounts: {
      platform: string;
      username: string;
    }[] | null;
    power_badge: boolean;
  };
  text: string;
  timestamp: string;
  embeds: {
    url: string;
    metadata?: {
      content_type: string;
      content_length: number | null;
      _status: string;
      image?: {
        width_px: number;
        height_px: number;
      };
      html?: {
        favicon: string;
        ogImage: { url: string }[];
        ogTitle: string;
        ogLocale: string;
        ogDescription: string;
      };
    };
  }[];
  reactions: {
    likes_count: number;
    recasts_count: number;
    likes: {
      fid: number;
      fname: string;
    }[];
    recasts: {
      fid: number;
      fname: string;
    }[];
  };
  replies: {
    count: number;
  };
  channel: {
    object: string;
    id: string;
    name: string;
    image_url: string;
  } | null;
  mentioned_profiles: any[];
  author_channel_context?: {
    role: string;
    following: boolean;
  };
  tags?: {
    type?: string;
    id?: string;
    name?: string;
    imageUrl?: string;
  }[];
}

export function Casts({ casts }: { casts: Cast[] }) {
  if (!casts || casts.length === 0) {
    return (
      <ScrollArea className="w-full overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="shrink-0 max-h-[300px] sm:max-h-[400px] w-[400px] p-4 overflow-y-scroll">
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

  const uniqueCasts = Array.from(new Map(casts.map(cast => [cast.hash, cast])).values());

  return (
    <div className="casts-desktop-container">
      <h2 className="text-lg font-medium mb-2.5">Casts</h2>
      <ScrollArea className="w-full overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {uniqueCasts.map((cast) => (
            <Card 
              key={cast.hash} 
              className="shrink-0 size-auto w-[400px] max-h-[20vh] sm:max-h-[22.5vh] overflow-y-hidden text-sm p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border-0 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => window.open(`https://warpcast.com/~/conversation/${cast.hash}`, '_blank')}
            >
              <div className="flex items-center space-x-2.5 mb-2">
                <img src={cast.author.pfp_url || ""} alt={cast.author.username || ""} className="rounded-full size-10" />
                <div className="leading-tight">
                  <div className="font-medium">{cast.author.display_name}</div>
                  <div className="text-xs text-gray-500">@{cast.author.username}</div>
                </div>
              </div>
              <div className="text-xs mt-2">{cast.text}</div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}