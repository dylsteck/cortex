import { tool } from "ai"
import { z } from "zod"

import { BASE_URL, CAST_HASH_LENGTH, cortexSDK } from "./utils"

export const tools = {
  analyzeCast: tool({
    description: 'Retrieve and analyze/explain details of a specific cast by its hash or Warpcast URL.',
    parameters: z.object({
      input: z.string(),
    }),
    execute: async ({ input }) => {
      const warpcastHashRegex = /^(https?:\/\/)?(warpcast\.com|supercast\.xyz|casterscan\.com|recaster\.org)\/.*?(0x[0-9a-fA-F]+)/;
      const hashRegex = /^0x[0-9a-fA-F]+$/;
      
      let matchValue = input;
      let matchType = 'hash';

      const urlMatch = input.match(warpcastHashRegex);
      if (urlMatch) {
        matchValue = input.startsWith('http') ? input : `https://${input}`;
        matchType = 'url';
      } else if (hashRegex.test(input)) {
        matchType = 'hash';
        matchValue = input;
      }

      const castData = await cortexSDK.getCast(matchType, matchValue);
      return castData;
    },
  }),
  askNeynarDocs: tool({
    description: 'Ask a question to Neynar\'s AI assistant for insights on how to use Neynar to build on top of Farcaster. The assistant can also answer general questions about building on Farcaster',
    parameters: z.object({
      question: z.string(),
    }),
    execute: async ({ question }) => {
      try {
        return await cortexSDK.askNeynarDocs(question);
      } catch (error) {
        console.error('Error in askNeynarDocs tool:', error);
        return `Error querying Neynar: ${(error as Error).message}`;
      }
    },
  }),
  castSearch: tool({
    description: 'Search over content(posts, casts as Farcaster calls them) on Farcaster per a given query.',
    parameters: z.object({
      query: z.string(),
    }),
    execute: async ({ query }) => {
      const castSearchData = await cortexSDK.castSearch(query)
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
      const res = await cortexSDK.getBounties(status, eventsSince);
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
      const channelCasts = await cortexSDK.getChannelsCasts({
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
      const trendingTokenData = await cortexSDK.getClankerTrendingTokens();
      return trendingTokenData;
    },
  }),
  // getEthAddressTimeline: tool({
  //   description: 'Get the timeline of activity for an Ethereum wallet by address or ENS name',
  //   parameters: z.object({
  //     identifier: z.string(),
  //   }),
  //   execute: async ({ identifier }) => {
  //     const isEnsName = identifier.endsWith('.eth');
  //     if(isEnsName){
  //       const ensData = await cortexSDK.getEnsName(identifier);
  //       const address = ensData.address
  //       const timelineData = await cortexSDK.getEthAddressTimeline(address);
  //       return timelineData.data.accountsTimeline.edges;
  //     } else{
  //       const timelineData = await cortexSDK.getEthAddressTimeline(identifier);
  //       return timelineData.data.accountsTimeline.edges;
  //     }
  //   },
  // }),
  getEvents: tool({
    description: `Get upcoming Farcaster events on Events.xyz. Do not show any images in your response and try to model your response into this format below:
    
    Here are some upcoming events:
    • [Event Name] at [Event Time] hosted by [Event Hosts]: [Link](https://events.xyz/events/[Event ID])

    [One to two sentence overview of the events given the context]`,
    parameters: z.object({}),
    execute: async ({}) => {
      const eventsData = await cortexSDK.getEvents();
      return eventsData;
    },
  }),
  // getIcebreakerEthProfile: tool({
  //   description: 'Get Icebreaker profile for an Ethereum address or ENS name.',
  //   parameters: z.object({
  //     identifier: z.string(),
  //   }),
  //   execute: async ({ identifier }) => {
  //     const profileData = await cortexSDK.getIcebreakerEthProfile(identifier);
  //     return profileData;
  //   },
  // }),
  // getIcebreakerFCUser: tool({
  //   description: 'Get Icebreaker profile for a Farcaster username (fname).',
  //   parameters: z.object({
  //     fname: z.string(),
  //   }),
  //   execute: async ({ fname }) => {
  //     const profileData = await cortexSDK.getIcebreakerFCUser(fname);
  //     return profileData;
  //   },
  // }),
  // getNounsBuilderProposals: tool({
  //   description: 'Get Nouns Builder proposals for a specific contract address',
  //   parameters: z.object({
  //     contractAddress: z.string(),
  //     first: z.number().optional(),
  //     skip: z.number().optional(),
  //   }),
  //   execute: async ({ contractAddress, first, skip }) => {
  //     const proposalsData = await cortexSDK.getNounsBuilderProposals(contractAddress, first, skip);
  //     return proposalsData.proposals.slice(0, 10);
  //   },
  // }),
  getUserCasts: tool({
    description: 'Gets the latest casts per a particular username on Farcaster.',
    parameters: z.object({
        username: z.string(),
    }),
    execute: async ({ username }) => {
        const user = await cortexSDK.getFarcasterUser(username);
        if(!user){
            throw new Error('User data not available');
        }
        const userCastsData = await cortexSDK.getFarcasterUserCasts(user.fid);
        return userCastsData.casts;
    },
  }),
  getTrendingCasts: tool({
    description: 'Get trending casts (posts) from Farcaster.',
    parameters: z.object({}),
    execute: async ({}) => {
      const trendingCasts = await cortexSDK.getTrendingCasts()
      return trendingCasts.casts
    },
  })
}