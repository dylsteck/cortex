"use client"

import { useEffect, useState, useCallback, memo } from "react";
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";

import { fetcher } from "@/lib/utils";

import { Widget } from "../widget";

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

interface CastData {
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
}

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

interface FarcasterFeedProps {
  fid: string;
}

const CastItem = memo(({ cast }: { cast: Cast }) => {
  const castData = convertCastToCastData(cast);
  return (
    <div className="mb-4 w-full min-w-[300px] max-w-[500px] mx-auto">
      <FarcasterEmbed castData={castData} />
    </div>
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

  return (
    <Widget>
      <div className="p-2 sm:p-4 overflow-y-auto">
        <div className="flex flex-col items-center">
          {casts.map((cast) => (
            <CastItem key={cast.hash} cast={cast} />
          ))}
        </div>
      </div>
    </Widget>
  );
}
