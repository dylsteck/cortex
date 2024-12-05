import { z } from "zod";

// ============================================================================
// Base Types & Interfaces
// ============================================================================

export interface Widget {
    id: string;
    name: string;
    description: string;
    iconUrl: string;
    component: React.ComponentType<any>;
    paramsSchema?: z.ZodObject<any>;
}

export interface ExtendedWidget extends Widget {
    app: App;
}

export interface App {
    id: string;
    name: string;
    description: string;
    iconUrl: string;
    widgets: Widget[];
}

export interface GridPosition {
    x: number;
    y: number;
    w: number;
    h: number;
}

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
    imageUrl: z.string(),
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
    profileID: z.string(),
    walletAddress: z.string(),
    avatarUrl: z.string().optional(),
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
// Widget Props Schemas
// ============================================================================

export const IcebreakerWidgetPropsSchema = z.object({
    fname: z.string().optional(),
    fid: z.string().optional()
}).refine(data => data.fname || data.fid, {
    message: "Either fname or fid must be provided"
});

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