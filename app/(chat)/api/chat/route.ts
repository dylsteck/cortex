import { convertToCoreMessages, Message, streamText } from 'ai';
import { z } from 'zod';

import { customModel } from '@/ai';
import { auth } from '@/app/(auth)/auth';
import Iframe from '@/components/custom/iframe';
import { deleteChatById, getChatById, saveChat } from '@/db/queries';
import { Model, models } from '@/lib/model';
import { tools } from '@/lib/tools';
import { BASE_URL, cortexAPI, fetcher } from '@/lib/utils';

export async function POST(request: Request) {
  const {
    id,
    messages,
    model,
  }: { id: string; messages: Array<Message>; model: Model['name'] } =
    await request.json();

  const session = await auth();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!models.find((m) => m.name === model)) {
    return new Response('Model not found', { status: 404 });
  }

  const coreMessages = convertToCoreMessages(messages);

  const result = await streamText({
    model: customModel(model),
    system:
      'You are a web searching personal assistant whose objective is to either proceed or enquire so you can show a Markdown page with the full results. Show smaller summary bullet-points with emojis as the bullet point and a sub-header for the bullet point, so that your response functions as a mini web page for the query result. Do *not* show any images or other embeds.',
    messages: coreMessages,
    maxSteps: 10,
    // tools: {
    //   getWeather: {
    //     description: 'Get the current weather at a location',
    //     parameters: z.object({
    //       latitude: z.number(),
    //       longitude: z.number(),
    //     }),
    //     execute: async ({ latitude, longitude }) => {
    //       const response = await fetch(
    //         `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
    //       );

    //       const weatherData = await response.json();
    //       return weatherData;
    //     },
    //   },
    //   searchCasts: {
    //     description: 'Search over content(posts or casts) on Farcaster per a given query/keyword',
    //     parameters: z.object({
    //       query: z.string(),
    //     }),
    //     execute: async ({ query }) => {
    //       const response = await fetch(`${BASE_URL}/api/farcaster/cast/search?q=${query}`);
    //       const castData = await response.json();
    //       return castData.result.casts;
    //     },
    //   },
    //   getUserCasts: {
    //     description: 'Gets the latest casts per a particular username on Farcaster',
    //     parameters: z.object({
    //       username: z.string(),
    //     }),
    //     execute: async ({ username }) => {
    //       const user = await cortexAPI.getFarcasterUser(username);
    //       const response = await fetcher(`${BASE_URL}/api/farcaster/feed/user/casts?fid=${`${user.fid}`}`);
    //       const castData = await response.json();
    //       return castData.casts;
    //     },
    //   },
    //   getEvents: {
    //     description: 'Get upcoming Farcaster events on Events.xyz. Do not show any images or markdown in your response, instead give a text summary of all the events. Not even a list, just a paragraph of sumamry text like prose!',
    //     parameters: z.object({}),
    //     execute: async ({}) => {
    //       const response = await fetch(`${BASE_URL}/api/farcaster/events`);
    //       const eventsData = await response.json();
    //       return eventsData;
    //     },
    //   },
    // },
    tools: tools,
    onFinish: async ({ responseMessages }) => {
      if (session.user && session.user.id) {
        try {
          await saveChat({
            id,
            messages: [...coreMessages, ...responseMessages],
            userId: session.user.id,
          });
        } catch (error) {
          console.error('Failed to save chat');
        }
      }
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: 'stream-text',
    },
  });

  return result.toDataStreamResponse({});
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Not Found', { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    await deleteChatById({ id });

    return new Response('Chat deleted', { status: 200 });
  } catch (error) {
    return new Response('An error occurred while processing your request', {
      status: 500,
    });
  }
}