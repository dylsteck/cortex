import { auth } from "@/app/(auth)/auth";
import { authMiddleware, ICEBREAKER_API_URL, redis } from "@/lib/utils";

interface IcebreakerProfile {
  profileID: string;
  walletAddress: string;
  avatarUrl: string;
  displayName: string;
  bio: string;
  jobTitle: string;
  primarySkill: string;
  networkingStatus: string;
  location: string;
  channels: {
    type: string;
    isVerified: boolean;
    isLocked: boolean;
    value: string;
    url: string;
    metadata?: {
      name: string;
      value: string;
    }[];
  }[];
  credentials: {
    name: string;
    chain: string;
    source: string;
    reference: string;
  }[];
  highlights: any[];
  workExperience: any[];
  events: {
    id: string;
    source: string;
    city: string;
    country: string;
    description: string;
    endDate: string;
    eventUrl: string;
    expiryDate: string;
    imageUrl: string;
    name: string;
    startDate: string;
    year: string;
  }[];
  guilds: {
    guildId: number;
    joinedAt: string;
    roleIds: number[];
    isAdmin: boolean;
    isOwner: boolean;
  }[];
}

interface IcebreakerResponse {
  profile: {
    profiles: IcebreakerProfile[];
  };
}

export async function GET(request: Request) {
  const session = await auth();
  const authResponse = authMiddleware(session, request.url, request.headers);
  if (authResponse) {
    return authResponse;
  }

  const url = new URL(request.url);
  const fid = url.searchParams.get("fid");

  if (!fid || isNaN(Number(fid))) {
    return new Response(JSON.stringify({ message: "Fid is required and must be a number" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const profileCacheKey = `icebreaker:fid:${fid}`;
    const cachedProfileData = await redis.get(profileCacheKey);

    let profileData: IcebreakerResponse;
    if (cachedProfileData) {
      profileData = cachedProfileData as IcebreakerResponse;
    } else {
      const response = await fetch(`${ICEBREAKER_API_URL}/fid/${encodeURIComponent(fid)}`, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching profile: ${response.statusText}`);
      }
      profileData = await response.json();
      await redis.set(profileCacheKey, JSON.stringify(profileData), { ex: 1800 });
    }
    return new Response(JSON.stringify(profileData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}