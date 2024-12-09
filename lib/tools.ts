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
}