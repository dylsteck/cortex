/* eslint-disable @next/next/no-img-element */
import { Heart, Repeat } from 'lucide-react';
import React from 'react';

import { ClankerTrendingTokensResponse } from '../../common/types/clanker';

export const Clanker = ({ clanker, theme = 'light' }: { 
  clanker: ClankerTrendingTokensResponse['tokens'][string], 
  theme?: 'light' | 'dark'
}) => {
  const textColors = {
    light: {
      username: 'text-black',
      reactions: 'text-black',
      body: 'text-black',
      border: 'border-gray-300'
    },
    dark: {
      username: 'text-gray-400',
      reactions: 'text-gray-400',
      body: 'text-gray-200',
      border: 'border-gray-900'
    }
  };

  return (
    <div className={`p-4 rounded-lg max-w-xs border ${textColors[theme].border} shadow-lg overflow-hidden`}> 
      <div className="flex flex-col space-y-2">
        {clanker.img_url && (
          <img
            src={clanker.img_url}
            alt={clanker.name}
            className="size-20 rounded-full border border-gray-600 self-center"
          />
        )}
        <div className="text-center">
          <p className={`font-semibold text-lg ${textColors[theme].username}`}>{clanker.name}</p>
          <p className={`text-sm ${textColors[theme].username}`}>
            {clanker.symbol}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className={`text-xs font-medium ${textColors[theme].body}`}>Contract Address</p>
            <p className={`text-sm truncate ${textColors[theme].body}`}>{clanker.contract_address}</p>
          </div>
          <div>
            <p className={`text-xs font-medium ${textColors[theme].body}`}>Pool Address</p>
            <p className={`text-sm truncate ${textColors[theme].body}`}>{clanker.pool_address}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className={`text-xs font-medium ${textColors[theme].body}`}>Created At</p>
            <p className={`text-sm ${textColors[theme].body}`}>
              {new Date(clanker.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className={`text-xs font-medium ${textColors[theme].body}`}>Transaction Hash</p>
            <p className={`text-sm truncate ${textColors[theme].body}`}>{clanker.tx_hash}</p>
          </div>
        </div>
        {clanker.cast_hash && (
          <div>
            <p className={`text-xs font-medium ${textColors[theme].body}`}>Cast Hash</p>
            <p className={`text-sm truncate ${textColors[theme].body}`}>{clanker.cast_hash}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className={`text-xs font-medium ${textColors[theme].body}`}>Type</p>
            <p className={`text-sm ${textColors[theme].body}`}>{clanker.type || 'N/A'}</p>
          </div>
          <div>
            <p className={`text-xs font-medium ${textColors[theme].body}`}>Pair</p>
            <p className={`text-sm ${textColors[theme].body}`}>{clanker.pair || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};