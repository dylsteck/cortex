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

interface NFTMintWidgetProps {
  contractAddress: `0x${string}`;
  tokenId?: string;
  className?: string;
}

export default function NFTMintWidget({
  contractAddress,
  tokenId,
  className = 'w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden',
}: NFTMintWidgetProps) {
  return (
    <div className={className}>
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
    </div>
  );
}
