import { NextResponse } from 'next/server';

import { StreammStream } from '@/lib/types';
import { redis, STREAMM_API_URL } from '@/lib/utils';

export async function GET() {
  try {
    const cacheKey = 'streamm:livestreams:streamm';
    
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      let livestreams: StreammStream[];
      if (typeof cachedData === 'string') {
        try {
          livestreams = JSON.parse(cachedData);
        } catch (parseError) {
          console.error('Error parsing cached livestreams:', parseError);
          return await fetchFreshLivestreams(cacheKey);
        }
      } else if (Array.isArray(cachedData)) {
        livestreams = cachedData;
      } else {
        console.error('Unexpected cached data type:', typeof cachedData);
        return await fetchFreshLivestreams(cacheKey);
      }
      
      return NextResponse.json(livestreams, { status: 200 });
    }
    
    return await fetchFreshLivestreams(cacheKey);
  } catch (error) {
    console.error('Error fetching livestreams:', error);
    return NextResponse.json({ error: 'Unable to fetch livestreams' }, { status: 500 });
  }
}

async function fetchFreshLivestreams(cacheKey: string) {
  const response = await fetch(`${STREAMM_API_URL}/stream/getAllLivestreams?recordings=streamm.tv`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch livestreams');
  }
  
  const livestreams: StreammStream[] = await response.json();
  
  await redis.set(cacheKey, JSON.stringify(livestreams), { ex: 300 });
  
  return NextResponse.json(livestreams, { status: 200 });
}