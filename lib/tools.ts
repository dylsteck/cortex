import { tool } from "ai"
import { z } from "zod"

import { BASE_URL, cortexAPI } from "./utils"

export const tools = {
  castSearch: tool({
    description: 'Search over content(posts, casts as Farcaster calls them) on Farcaster per a given query.',
    parameters: z.object({
      query: z.string(),
    }),
    execute: async ({ query }) => {
      const castSearchData = await cortexAPI.castSearch(query)
      return castSearchData.result.casts
    },
  }),
  getBounties: tool({
    description: 'Get Farcaster bounties with optional status and time filtering. Include the link to each bounty *on Bountcaster*, not on Farcaster/Warpcast, in your response.',
    parameters: z.object({
      status: z.string().optional(),
      timeFrame: z.string().optional(),
    }),
    execute: async ({ status, timeFrame }) => {
      let eventsSince: string | undefined;
      
      if (timeFrame) {
        const now = new Date(Date.now());
        const lowerInput = timeFrame.toLowerCase();
        let date = new Date(now);

        if (lowerInput.includes('month')) {
          date.setMonth(date.getMonth() - 1);
        } else if (lowerInput.includes('week')) {
          date.setDate(date.getDate() - 7);
        } else if (lowerInput.includes('day')) {
          date.setDate(date.getDate() - 1);
        } else if (lowerInput.includes('hour')) {
          date.setHours(date.getHours() - 1);
        } else {
          try {
            date = new Date(timeFrame);
          } catch {
            date = now;
          }
        }
        eventsSince = date.toISOString();
      }
      const res = await cortexAPI.getBounties(status, eventsSince);
      return res.bounties;
    },
  }),
  getClankerTrendingTokens: tool({
    description: 'Gets trending crypto tokens from Clanker, a token launcher built on top of Farcaster',
    parameters: z.object({}),
    execute: async ({}) => {
      const trendingTokenData = await cortexAPI.getClankerTrendingTokens();
      return trendingTokenData;
    },
  }),
  getWowTrendingTokens: tool({
    description: 'Gets trending crypto tokens from Wow.xyz, a token launcher on Base',
    parameters: z.object({}),
    execute: async ({}) => {
      const trendingTokenData = await cortexAPI.getWowTrendingTokens();
      return trendingTokenData;
    },
  }),
  getEvent: tool({
    description: 'Gets information about an upcoming Farcaster event given its name',
    parameters: z.object({
      name: z.string(),
    }),
    execute: async ({ name }) => {
      const eventData = await cortexAPI.getEvent(undefined, name);
      return eventData;
    },
  }),
  getEvents: tool({
    description: 'Get upcoming Farcaster events on Events.xyz. Do not show any images or markdown in your response.',
    parameters: z.object({}),
    execute: async ({}) => {
      const eventsData = await cortexAPI.getEvents();
      return eventsData;
    },
  }),
  getFarcasterUser: tool({
    description: 'Gets information about a Farcaster user.',
    parameters: z.object({
        username: z.string(),
    }),
    execute: async ({ username }) => {
      const userData = await cortexAPI.getFarcasterUser(username);
      return userData
    },
  }),
  getUserCasts: tool({
    description: 'Gets the latest casts per a particular username on Farcaster.',
    parameters: z.object({
        username: z.string(),
    }),
    execute: async ({ username }) => {
        const user = await cortexAPI.getFarcasterUser(username);
        if(!user){
            throw new Error('User data not available');
        }
        const userCastsData = await cortexAPI.getFarcasterUserCasts(user.fid);
        return userCastsData.casts;
    },
  }),
  getWeather: tool({
    description: 'Get the current weather at a location.',
    parameters: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    execute: async ({ latitude, longitude }) => {
      const weatherData = await cortexAPI.getWeather(latitude, longitude)
      return weatherData
    },
  }),
  webSearch: tool({
    description: 'Search the web for information with the given query.',
    parameters: z.object({
      query: z.string(),
      maxResults: z.number().default(10),
      searchDepth: z.enum(['basic', 'advanced']).default('basic'),
      includeDomains: z.array(z.string()).default([]),
      excludeDomains: z.array(z.string()).default([]),
    }),
    execute: async ({ query, maxResults, searchDepth, includeDomains, excludeDomains }) => {
      const searchData = await cortexAPI.webSearch(query, maxResults, searchDepth, includeDomains, excludeDomains)
      return searchData
    },
  }),
  getTrendingCasts: tool({
    description: 'Get trending casts (posts) from Farcaster.',
    parameters: z.object({}),
    execute: async ({}) => {
      const trendingCasts = await cortexAPI.getTrendingCasts()
      return trendingCasts.casts
    },
  }),
  getIcebreakerFCUser: tool({
    description: 'Get Icebreaker profile for a Farcaster username (fname).',
    parameters: z.object({
      fname: z.string(),
    }),
    execute: async ({ fname }) => {
      const profileData = await cortexAPI.getIcebreakerFCUser(fname);
      return profileData;
    },
  }),
  getIcebreakerEthProfile: tool({
    description: 'Get Icebreaker profile for an Ethereum address or ENS name.',
    parameters: z.object({
      identifier: z.string(),
    }),
    execute: async ({ identifier }) => {
      const profileData = await cortexAPI.getIcebreakerEthProfile(identifier);
      return profileData;
    },
  }),
  getIcebreakerCredentialProfiles: tool({
    description: 'Get Icebreaker profiles by a specific credential name.',
    parameters: z.object({
      credentialName: z.string(),
      limit: z.number().optional().default(100),
      offset: z.number().optional().default(3),
    }),
    execute: async ({ credentialName, limit, offset }) => {
      const profilesData = await cortexAPI.getIcebreakerCredentialProfiles(credentialName, limit, offset);
      return profilesData;
    },
  }),
  getLivestreams: tool({
    description: 'Get current Farcaster livestreams',
    parameters: z.object({}),
    execute: async () => {
      const livestreamData = await cortexAPI.getLivestreams();
      return livestreamData;
    },
  }),
  getChannelsCasts: tool({
    description: 'Get casts from specific Farcaster channels.',
    parameters: z.object({
      channel_ids: z.string(),
      with_recasts: z.boolean().optional(),
      viewer_fid: z.number().optional(),
      with_replies: z.boolean().optional(),
      members_only: z.boolean().optional(),
      limit: z.number().optional(),
      cursor: z.string().optional(),
    }),
    execute: async ({ 
      channel_ids, 
      with_recasts, 
      viewer_fid, 
      with_replies, 
      members_only, 
      limit, 
      cursor 
    }) => {
      const channelCasts = await cortexAPI.getChannelsCasts({
        channel_ids, 
        with_recasts, 
        viewer_fid, 
        with_replies, 
        members_only, 
        limit, 
        cursor
      });
      return channelCasts.casts;
    },
  }),
}