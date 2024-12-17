/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

import { ToolResponse, ToolResponseHeader, ToolResponseBody, ToolResponseCard } from "./tool-response";

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