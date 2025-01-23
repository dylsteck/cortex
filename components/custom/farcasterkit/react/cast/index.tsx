/* eslint-disable @next/next/no-img-element */
import { Heart, Repeat } from 'lucide-react';
import React from 'react';

import { NeynarCastV2 } from '@/lib/types';

export const Cast = ({ cast, theme = 'light' }: { cast: NeynarCastV2, theme?: 'light' | 'dark'}) => {
  const textColors = {
    light: {
      username: 'text-white',
      reactions: 'text-white',
      body: 'text-white',
      border: 'border-gray-700'
    },
    dark: {
      username: 'text-gray-400',
      reactions: 'text-gray-400',
      body: 'text-gray-200',
      border: 'border-gray-900'
    }
  };

  return (
  <div className={`p-4 rounded-lg w-full border ${textColors[theme].border} shadow-lg overflow-hidden cursor-pointer`} onClick={() => window.open(`https://warpcast.com/${cast.author.username ?? `~/conversations`}/${cast.hash}`, '_blank')}> 
      <div className="flex items-center mb-3 space-x-3">
        <img
          src={cast.author.pfp_url}
          alt={cast.author.username}
          className="size-10 rounded-full border border-gray-600"
        />
        <div className="truncate">
          <p className={`font-semibold text-lg truncate ${textColors[theme].username}`}>{cast.author.display_name}</p>
          <p className={`text-sm truncate ${textColors[theme].username}`}>
            @{cast.author.username}
          </p>
        </div>
      </div>
      <p className={`text-base ${textColors[theme].body} break-words`}> 
        {cast.text.length > 380 ? `${cast.text.slice(0, 380)}...` : cast.text}
      </p>
      <div className="flex mt-3 space-x-4 items-center">
        <div className="flex items-center space-x-1">
          <Heart className="size-4 text-red-500" />
          <p className={`text-sm ${textColors[theme].reactions}`}>
            {cast.reactions.likes_count.toString()}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <Repeat className="size-4 text-green-500" />
          <p className={`text-sm ${textColors[theme].reactions}`}>
            {cast.reactions.recasts_count.toString()}
          </p>
        </div>
      </div>
    </div>
  );
};