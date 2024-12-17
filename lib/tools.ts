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
  getClankerTrendingTokens: tool({
    description: 'Gets trending crypto tokens from Clanker, a token launcher built on top of Farcaster',
    parameters: z.object({}),
    execute: async ({}) => {
      const trendingTokenData = await cortexAPI.getClankerTrendingTokens();
      return trendingTokenData;
    },
  }),
  getEthAddressTimeline: tool({
    description: 'Get the timeline of activity for an Ethereum wallet by address or ENS name',
    parameters: z.object({
      identifier: z.string(),
    }),
    execute: async ({ identifier }) => {
      const isEnsName = identifier.endsWith('.eth');
      if(isEnsName){
        const ensData = await cortexAPI.getEnsName(identifier);
        const address = ensData.address
        const timelineData = await cortexAPI.getEthAddressTimeline(address);
        return timelineData.data.accountsTimeline.edges;
      } else{
        const timelineData = await cortexAPI.getEthAddressTimeline(identifier);
        return timelineData.data.accountsTimeline.edges;
      }
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
  getLivestreams: tool({
    description: 'Get current Farcaster livestreams',
    parameters: z.object({}),
    execute: async () => {
      const livestreamData = await cortexAPI.getLivestreams();
      return livestreamData;
    },
  }),
  getNounsBuilderProposals: tool({
    description: 'Get Nouns Builder proposals for a specific contract address',
    parameters: z.object({
      contractAddress: z.string(),
      first: z.number().optional(),
      skip: z.number().optional(),
    }),
    execute: async ({ contractAddress, first, skip }) => {
      const proposalsData = await cortexAPI.getNounsBuilderProposals(contractAddress, first, skip);
      return proposalsData.proposals.slice(0, 10);
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
  getTrendingCasts: tool({
    description: 'Get trending casts (posts) from Farcaster.',
    parameters: z.object({}),
    execute: async ({}) => {
      const trendingCasts = await cortexAPI.getTrendingCasts()
      return trendingCasts.casts
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
  getWowTrendingTokens: tool({
    description: 'Gets trending crypto tokens from Wow.xyz, a token launcher on Base',
    parameters: z.object({}),
    execute: async ({}) => {
      const trendingTokenData = await cortexAPI.getWowTrendingTokens();
      return trendingTokenData;
    },
  }),
  askNeynar: tool({
    description: 'Ask a question to Neynar\'s AI assistant for insights on how to use Neynar to build on top of Farcaster. The assistant can also answer general questions about building on Farcaster',
    parameters: z.object({
      question: z.string(),
    }),
    execute: async ({ question }) => {
      try {
        const response = await fetch('https://docs.neynar.com/chatgpt/ask', {
          method: 'POST',
          headers: {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.5',
            'content-type': 'application/json',
          },
          body: JSON.stringify({ question }),
        });

        if (!response.ok) {
          throw new Error(`Neynar API request failed with status ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let result = '';

        while (true) {
          const { done, value } = await reader?.read() || {};
          if (done) break;
          result += decoder.decode(value, { stream: true });
        }

        const sanitizedResult = result
          .replace(/^---data:\s*/gm, '')  
          .replace(/\n+/g, '\n')         
          .trim();     
                         
        return sanitizedResult || 'No response from Neynar';
      } catch (error) {
        console.error('Error in askNeynar tool:', error);
        return `Error querying Neynar: ${(error as Error).message}`;
      }
    },
  }),
  // webSearch: tool({
  //   description: 'Search the web for information with the given query.',
  //   parameters: z.object({
  //     query: z.string(),
  //     maxResults: z.number().default(10),
  //     searchDepth: z.enum(['basic', 'advanced']).default('basic'),
  //     includeDomains: z.array(z.string()).default([]),
  //     excludeDomains: z.array(z.string()).default([]),
  //   }),
  //   execute: async ({ query, maxResults, searchDepth, includeDomains, excludeDomains }) => {
  //     const searchData = await cortexAPI.webSearch(query, maxResults, searchDepth, includeDomains, excludeDomains)
  //     return searchData
  //   },
  // }),
}