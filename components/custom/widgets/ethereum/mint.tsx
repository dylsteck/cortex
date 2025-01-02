import { NFTMintCard } from '@coinbase/onchainkit/nft';
import {
  NFTCreator,
  NFTCollectionTitle,
  NFTQuantitySelector,
  NFTAssetCost,
  NFTMintButton,
} from '@coinbase/onchainkit/nft/mint';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import '@coinbase/onchainkit/styles.css';
import { z } from 'zod';

import { Widget } from '../widget';

interface NFTMintWidgetProps {
  contractAddress: `0x${string}`;
  tokenId?: string;
  className?: string;
}

export const nftMintParamsMetadata = {
  contractAddress: {
    label: 'Contract Address',
    description: 'The Ethereum address of the NFT contract',
    placeholder: '0x...'
  },
  tokenId: {
    label: 'Token ID',
    description: 'Optional: The specific token ID to mint',
    placeholder: 'Enter token ID'
  }
};

export const nftMintSchema = z.object({
  contractAddress: z.string()
    .min(42, 'Must be a valid Ethereum address')
    .max(42, 'Must be a valid Ethereum address')
    .describe('The Ethereum address of the NFT contract'),
  tokenId: z.string().optional()
    .describe('Optional: The specific token ID to mint')
});

export default function NFTMintWidget({
  contractAddress,
  tokenId,
  className = 'w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden',
}: NFTMintWidgetProps) {
  return (
    <Widget className={className}>
      <NFTMintCard
        contractAddress={contractAddress}
        tokenId={tokenId}
      >
        <div className="p-6 space-y-4">
          <div className="rounded-lg overflow-hidden">
            <NFTMedia square={true} />
          </div>
          <NFTCreator />
          <NFTCollectionTitle className="text-xl font-bold" />
          <div className="space-y-3">
            <NFTQuantitySelector className="w-full" />
            <NFTAssetCost className="text-lg font-medium" />
            <NFTMintButton className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors" />
          </div>
        </div>
      </NFTMintCard>
    </Widget>
  );
}
