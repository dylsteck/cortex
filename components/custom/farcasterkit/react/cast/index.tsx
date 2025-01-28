/* eslint-disable @next/next/no-img-element */
import { Heart, Repeat } from 'lucide-react';
import React from 'react';

import { NeynarCastV2 } from '@/lib/types';

export const Cast = ({ cast }: { cast: NeynarCastV2 }) => {

  return (
    <div className={`p-4 rounded-lg w-full overflow-hidden cursor-pointer`} onClick={() => window.open(`https://warpcast.com/${cast.author.username ?? `~/conversations`}/${cast.hash}`, '_blank')}> 
      <div className="flex items-center mb-3 space-x-2">
        <img
          src={cast.author.pfp_url}
          alt={cast.author.username}
          className="size-9 rounded-full"
        />
        <div className="truncate">
          <p className={`font-semibold text-md truncate text-white`}>{cast.author.display_name}</p>
          <p className={`text-sm truncate text-white`}>
            @{cast.author.username}
          </p>
        </div>
      </div>
      <p className={`text-base break-words text-white`}> 
        {cast.text.length > 380 ? `${cast.text.slice(0, 380)}...` : cast.text}
      </p>
      <div className="flex mt-2 space-x-4 items-center">
        <div className="flex items-center space-x-1">
          <Heart className="size-4 text-red-500" />
          <p className={`text-sm text-white`}>
            {cast.reactions.likes_count.toString()}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <Repeat className="size-4 text-green-500" />
          <p className={`text-sm text-white`}>
            {cast.reactions.recasts_count.toString()}
          </p>
        </div>
      </div>
    </div>
  );
};