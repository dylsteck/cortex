/* eslint-disable @next/next/no-img-element */
import { Heart, Repeat } from 'lucide-react';
import React from 'react';

import { ClankerTrendingTokensResponse } from '../../common/types/clanker';

export const Clanker = ({ clanker }: { 
  clanker: ClankerTrendingTokensResponse['tokens'][string]
}) => {
  return (
    <div className="p-4 rounded-lg w-full overflow-hidden text-black dark:text-white cursor-pointer" onClick={() => window.open(`https://clanker.world/clanker/${clanker.contract_address}`, '_blank')}> 
      <div className="flex items-start space-x-4">
        {clanker.img_url && (
          <img
            src={clanker.img_url}
            alt={clanker.name}
            className="size-10 rounded-full border border-gray-600"
          />
        )}
        <div className="flex flex-col">
          <p className={`font-semibold text-lg`}>{clanker.name}</p>
          <p className={`text-sm`}>{clanker.symbol}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className={`text-xs font-medium`}>Contract Address</p>
            <p className={`text-sm truncate`}>{clanker.contract_address.slice(0, 10)}...{clanker.contract_address.slice(-4)}</p>
          </div>
          <div>
            <p className={`text-xs font-medium`}>Pool Address</p>
            <p className={`text-sm truncate`}>{clanker.pool_address.slice(0, 10)}...{clanker.pool_address.slice(-4)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className={`text-xs font-medium`}>Created At</p>
            <p className={`text-sm`}>
              {new Date(clanker.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className={`text-xs font-medium`}>Transaction Hash</p>
            <p className={`text-sm truncate`}>{clanker.tx_hash.slice(0, 10)}...{clanker.tx_hash.slice(-4)}</p>
          </div>
        </div>
        {/* {clanker.cast_hash && (
          <div>
            <p className={`text-xs font-medium`}>Cast Hash</p>
            <p className={`text-sm truncate`}>{clanker.cast_hash.slice(0, 10)}...{clanker.cast_hash.slice(-4)}</p>
          </div>
        )} */}
        {/* <div className="grid grid-cols-2 gap-2">
          <div>
            <p className={`text-xs font-medium`}>Type</p>
            <p className={`text-sm`}>{clanker.type || 'N/A'}</p>
          </div>
          <div>
            <p className={`text-xs font-medium`}>Pair</p>
            <p className={`text-sm`}>{clanker.pair || 'N/A'}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};