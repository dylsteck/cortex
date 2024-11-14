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
  getComposerActions: tool({
    description: 'Get Farcaster composer actions, which are mini apps Farcaster users can interact with',
    parameters: z.object({}),
    execute: async ({}) => {
      const composerActionData = await cortexAPI.getComposerActions();
      return composerActionData;
    },
  }),
  getEvents: tool({
    description: 'Get upcoming Farcaster events on Events.xyz. Do not show any images or markdown in your response.',
    parameters: z.object({}),
    execute: async ({}) => {
      const eventsData = await cortexAPI.getEvents()
      return eventsData
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
}