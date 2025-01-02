/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useCallback, memo } from "react";

import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetcher } from "@/lib/utils";

import { Widget } from "../widget";


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

interface FarcasterFeedProps {
  fid: string;
}

const CastItem = memo(({ cast }: { cast: Cast }) => {
  return (
    <Card
      key={cast.hash}
      className="shrink-0 size-auto w-[400px] max-h-[20vh] sm:max-h-[22.5vh] overflow-y-hidden text-sm p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border-0 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
      onClick={() => window.open(`https://warpcast.com/~/conversations/${cast.hash}`, '_blank')}
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
  );
});
CastItem.displayName = 'CastItem';

export default function FarcasterFeed({ fid }: FarcasterFeedProps) {
  const [casts, setCasts] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCasts = useCallback(async () => {
    try {
      const data = await fetcher(`/api/farcaster/feed/user/casts?fid=${fid}`);
      setCasts(data.casts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch casts');
    } finally {
      setLoading(false);
    }
  }, [fid]);

  useEffect(() => {
    fetchCasts();
  }, [fetchCasts]);

  if (loading) {
    return (
      <Widget>
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full size-8 border-b-2 border-purple-500" />
        </div>
      </Widget>
    );
  }

  if (error) {
    return (
      <Widget>
        <div className="p-4 text-red-500">Error: {error}</div>
      </Widget>
    );
  }

  const uniqueCasts = Array.from(new Map(casts.map(cast => [cast.hash, cast])).values());

  return (
    <Widget>
      <div className="p-2 sm:p-4 overflow-y-auto">
        <h2 className="text-lg font-medium mb-2.5">Casts</h2>
        <ScrollArea className="w-full overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            {uniqueCasts.map((cast) => (
              <CastItem key={cast.hash} cast={cast} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </Widget>
  );
}