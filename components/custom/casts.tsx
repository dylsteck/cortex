"use client";
import React from 'react';
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";

import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import "react-farcaster-embed/dist/styles.css";

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

type CastData = {
  hash?: string;
  threadHash?: string;
  parentSource?: {
    type?: string;
    url?: string;
  };
  author?: {
    fid?: number;
    username?: string;
    displayName?: string;
    pfp?: {
      url?: string;
    };
    profile?: {
      bio?: {
        text?: string;
      };
    };
    followerCount?: number;
    followingCount?: number;
  };
  text?: string;
  timestamp?: number;
  embeds?: {
    images?: {
      type: string;
      url: string;
      sourceUrl: string;
      alt: string;
    }[];
    urls?: {
      type: string;
      openGraph?: {
        url?: string;
        sourceUrl?: string;
        title?: string;
        description?: string;
        domain?: string;
        image?: string;
      };
    }[];
  };
  reactions?: {
    count?: number;
  };
  recasts?: {
    count?: number;
  };
  replies?: {
    count?: number;
  };
  tags?: {
    type?: string;
    id?: string;
    name?: string;
    imageUrl?: string;
  }[];
};

function convertCastToCastData(cast: Cast): CastData {
  return {
    hash: cast.hash,
    threadHash: cast.thread_hash,
    parentSource: cast.parent_url ? { type: "url", url: cast.parent_url } : undefined,
    author: {
      fid: cast.author.fid,
      username: cast.author.username,
      displayName: cast.author.display_name,
      pfp: {
        url: cast.author.pfp_url,
      },
      profile: {
        bio: {
          text: cast.author.profile.bio.text,
        },
      },
      followerCount: cast.author.follower_count,
      followingCount: cast.author.following_count,
    },
    text: cast.text,
    timestamp: new Date(cast.timestamp).getTime(),
    embeds: {
      images: cast.embeds?.filter(embed => embed.metadata?.content_type?.includes("image")).map(embed => ({
        type: "image",
        url: embed.url,
        sourceUrl: embed.url,
        alt: embed.metadata?.html?.ogDescription || "",
      })) || [],
      urls: cast.embeds?.filter(embed => embed.metadata?.content_type === "text/html").map(embed => ({
        type: "url",
        openGraph: {
          url: embed.url,
          title: embed.metadata?.html?.ogTitle,
          description: embed.metadata?.html?.ogDescription,
          image: embed.metadata?.html?.ogImage?.[0]?.url,
        },
      })) || [],
    },
    reactions: {
      count: cast.reactions.likes_count || 0,
    },
    recasts: {
      count: cast.reactions.recasts_count || 0,
    },
    replies: {
      count: cast.replies.count || 0,
    },
    tags: cast.tags || [],
  };
}

export function Casts({ casts }: { casts?: Cast[] }) {
  if (!casts) {
    return (
      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="shrink-0 max-h-[500px] w-[400px] p-4 overflow-y-scroll">
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
    <div>
      <h2 className="text-lg font-semibold mb-4">Casts</h2>
      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {uniqueCasts.map((cast) => (
            <Card key={cast.hash} className="shrink-0 size-auto max-w-[25vw] max-h-[55vh] overflow-y-scroll text-md">
              <div className="h-full">
                <FarcasterEmbed castData={convertCastToCastData(cast)} />
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}