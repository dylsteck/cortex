import { tool } from "ai"
import { z } from "zod"

import { BASE_URL, cortexAPI } from "./utils"

export const tools = {
  getEvents: {
    description: 'Get upcoming Farcaster events on Events.xyz. Do not show any images or markdown in your response.',
    parameters: z.object({}),
    execute: async ({}) => {
        const eventsData = await cortexAPI.getEvents();
        return eventsData;
    },
  },
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
