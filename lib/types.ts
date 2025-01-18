import { z } from "zod";

// ============================================================================
// Icebreaker Types & Schemas
// ============================================================================

export const IcebreakerChannelSchema = z.object({
    type: z.string(),
    isVerified: z.boolean(),
    isLocked: z.boolean(),
    value: z.string(),
    url: z.string().optional(),
    metadata: z.array(z.object({
        name: z.string(),
        value: z.string()
    })).optional()
});

export const IcebreakerCredentialSchema = z.object({
    name: z.string(),
    chain: z.string(),
    source: z.string(),
    reference: z.string()
});

export const IcebreakerHighlightSchema = z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().optional(),
    date: z.string().optional()
});

export const IcebreakerWorkExperienceSchema = z.object({
    company: z.string(),
    title: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean(),
    description: z.string().optional()
});

export const IcebreakerEventSchema = z.object({
    id: z.string(),
    source: z.string(),
    city: z.string(),
    country: z.string(),
    description: z.string(),
    endDate: z.string(),
    eventUrl: z.string(),
    expiryDate: z.string(),
    name: z.string(),
    startDate: z.string(),
    year: z.string()
});

export const IcebreakerGuildMembershipSchema = z.object({
    guildId: z.number(),
    joinedAt: z.string(),
    roleIds: z.array(z.number()),
    isAdmin: z.boolean()
});

export const IcebreakerProfileSchema = z.object({
    avatarUrl: z.string().optional(),
    profileID: z.string(),
    walletAddress: z.string(),
    displayName: z.string(),
    bio: z.string(),
    jobTitle: z.string().optional(),
    primarySkill: z.string().optional(),
    networkingStatus: z.string().optional(),
    location: z.string().optional(),
    channels: z.array(IcebreakerChannelSchema).optional(),
    credentials: z.array(IcebreakerCredentialSchema).optional(),
    highlights: z.array(IcebreakerHighlightSchema).optional(),
    workExperience: z.array(IcebreakerWorkExperienceSchema).optional(),
    events: z.array(IcebreakerEventSchema).optional(),
    guilds: z.array(IcebreakerGuildMembershipSchema).optional()
});

export type IcebreakerChannel = z.infer<typeof IcebreakerChannelSchema>;
export type IcebreakerCredential = z.infer<typeof IcebreakerCredentialSchema>;
export type IcebreakerHighlight = z.infer<typeof IcebreakerHighlightSchema>;
export type IcebreakerWorkExperience = z.infer<typeof IcebreakerWorkExperienceSchema>;
export type IcebreakerEvent = z.infer<typeof IcebreakerEventSchema>;
export type IcebreakerGuildMembership = z.infer<typeof IcebreakerGuildMembershipSchema>;
export type IcebreakerProfile = z.infer<typeof IcebreakerProfileSchema>;

// ============================================================================
// Nouns Builder Types
// ============================================================================

export interface Proposal {
    abstainVotes: number;
    againstVotes: number;
    calldatas: string[];
    description: string;
    descriptionHash: string;
    executableFrom: string;
    expiresAt: string;
    forVotes: number;
    proposalId: string;
    proposalNumber: number;
    proposalThreshold: number;
    proposer: string;
    quorumVotes: number;
    targets: string[];
    timeCreated: string;
    title: string;
    values: string[];
}

// ============================================================================
// Farcaster Types
// ============================================================================

export interface Cast {
    hash: string;
    threadHash: string;
    parentHash: string | null;
    author: {
        fid: number;
        username: string;
        displayName: string;
        pfp: {
            url: string;
        };
        profile: {
            bio: {
                text: string;
            };
        };
        followerCount: number;
        followingCount: number;
        activeOnFcNetwork: boolean;
    };
    text: string;
    timestamp: string;
    reactions: {
        count: number;
        type: string;
    }[];
    replies: {
        count: number;
    };
    recasts: {
        count: number;
    };
    watches: {
        count: number;
    };
    embeds: any[];
}

export interface NeynarCastV2 {
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

export interface WebhookData {
    created_at: number;
    type: string;
    data: {
      object: string;
      hash: string;
      author: NeynarCastV2['author'];
      thread_hash: string;
      parent_hash: string | null;
      parent_url: string | null;
      root_parent_url: string | null;
      parent_author: {
        fid: number | null;
      };
      text: string;
      timestamp: string;
      embeds: any[];
      channel: string | null;
      reactions: {
        likes_count: number;
        recasts_count: number;
        likes: any[];
        recasts: any[];
      };
      replies: {
        count: number;
      };
      mentioned_profiles: NeynarCastV2['author'];
      event_timestamp: string;
    };
};

export interface CastData {
    result: {
        casts: Cast[];
    };
}

export interface FarcasterFeedProps {
    fname?: string;
    fid?: string;
    channelId?: string;
}

export interface WarpcastCastsResponse {
    result: {
        casts: WarpcastCast[]
    }
}

export interface WarpcastCast {
    hash: string
    threadHash: string
    parentHash?: string
    parentAuthor?: {
        fid: number
        username: string
        displayName: string
        profile: {
            bio: {
                text: string
                mentions: string[]
                channelMentions: string[]
            }
            location: {
                placeId: string
                description: string
            }
        }
        followerCount: number
        followingCount: number
        activeOnFcNetwork: boolean
    }
    parentSource?: {
        type: string
        url: string
    }
    author: {
        fid: number
        username: string
        displayName: string
        pfp?: {
            url: string
            verified: boolean
        }
        profile: {
            bio: {
                text: string
                mentions: string[]
                channelMentions: string[]
            }
            location: {
                placeId: string
                description: string
            }
        }
        followerCount: number
        followingCount: number
        activeOnFcNetwork: boolean
        viewerContext: {
            following: boolean
            blockedBy: boolean
        }
    }
    castType?: string
    text?: string
    timestamp: number
    mentions: {
        fid?: number
        username?: string
        displayName?: string
        profile?: {
            bio: {
                text: string
                mentions: string[]
                channelMentions: string[]
            }
            location: {
                placeId: string
                description: string
            }
        }
        followerCount?: number
        followingCount?: number
    }[]
    ancestors: {
        count: number
        casts?: WarpcastCast[]
    }
    replies: {
        count: number
    }
    reactions: {
        count: number
    }
    recasts: {
        count: number
    }
    watches: {
        count: number
    }
    tags: {
        type: string
        id: string
        name: string
        imageUrl: string
    }[]
    quoteCount?: number
    combinedRecastCount?: number
    warpsTipped?: number
    viewCount?: number
    channel: {
        key: string
        name: string
        imageUrl: string
        authorContext: {
            role: string
            restricted: boolean
            banned: boolean
        }
        authorRole: string
    }
    viewerContext: {
        reacted: boolean
        recast: boolean
        bookmarked: boolean
    }
    channelMentions?: {
        key: string
        name: string
    }[]
    embeds?: {
        images: {
            type: string
            url: string
            sourceUrl?: string
            media?: {
                version: string
                width: number
                height: number
                staticRaster: string
            }
            alt?: string
        }[]
        urls: {
            type: string
            openGraph: {
                url: string
                sourceUrl: string
                title: string
                domain: string
                image: string
                useLargeImage?: boolean
                frame: {
                    version: string
                    frameUrl: string
                    imageUrl: string
                    postUrl: string
                    buttons: {
                        index: number
                        title: string
                        type: string
                    }[]
                    imageAspectRatio: string
                }
            }
        }[]
        videos: any[]
        unknowns: any[]
        processedCastText: string
        groupInvites: any[]
    }
}

// ============================================================================
// Auth Types
// ============================================================================

export interface SIWNUser {
    fid: number;
    username: string;
    displayName: string;
    pfp: string;
}

export interface SIWNResponseData {
    success: boolean;
    data?: {
        user: SIWNUser;
    };
    error?: string;
}

export type AuthData = {
  fid: string;
  username: string;
  name: string;
  bio: string;
  verified_address?: string;
  signer_uuid: string;
  pfp_url: string;
};

// ============================================================================
// ENS Data Types
// ============================================================================

export type ENSData = {
  address: string;
  avatar: string;
  avatar_small: string;
  avatar_url: string;
  contentHash: string;
  ens: string;
  ens_primary: string;
  expiry_date: string;
  farcaster: {
    custody_address: string;
    display_name: string;
    fid: number;
    follower_count: number;
    following_count: number;
    object: string;
    pfp_url: string;
    power_badge: boolean;
    profile: {
      bio: {
        text: string;
      };
      location: {
        address: {
          city: string;
          country: string;
          country_code: string;
          state: string;
          state_code: string;
        };
        latitude: number;
        longitude: number;
      };
    };
    username: string;
    verifications: string[];
    verified_accounts: string[];
    verified_addresses: {
      eth_addresses: string[];
      sol_addresses: string[];
    };
  };
  github: string;
  header: string;
  header_url: string;
  resolverAddress: string;
  twitter: string;
  url: string;
  wallets: {
    eth: string;
  };
}

// ============================================================================
// Zapper Data Types
// ============================================================================

export type ZapperAccountsTimelineResponse = {
    data: {
      accountsTimeline: {
        edges: Array<{
          node: {
            transaction: {
              hash: string;
              fromUser: {
                address: string;
                displayName: {
                  value: string;
                };
                ensRecord: {
                  name: string | null;
                };
              };
              toUser: {
                address: string;
                displayName: {
                  value: string;
                };
                ensRecord: {
                  name: string | null;
                } | null;
              };
              network: string;
              timestamp: number;
              transactionPrice: number;
              transactionFee: number;
              value: string;
              input: string;
              gasPrice: string;
              gas: number;
            };
            interpretation: {
              processedDescription: string;
            };
          };
        }>;
      };
    };
};