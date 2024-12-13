import { ExternalLink } from 'lucide-react';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ZapperAccountsTimelineResponse } from '@/lib/types';

interface EthTimelineProps {
  timeline?: ZapperAccountsTimelineResponse['data']['accountsTimeline']['edges'];
}

const resolveExplorerUrl = (network: string, hash: string): string | null => {
  switch (network) {
    case 'BASE_MAINNET':
      return `https://basescan.org/tx/${hash}`;
    case 'ETHEREUM_MAINNET':
      return `https://etherscan.io/tx/${hash}`;
    default:
      return null;
  }
};

const EthTimeline: React.FC<EthTimelineProps> = ({ timeline = [] }) => {
  if (timeline.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ethereum Address Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No transactions found for this Ethereum address.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="!mb-0 !pb-0">
        <CardTitle className="text-lg !m-0 !p-0">ETH Address Timeline</CardTitle>
      </CardHeader>
      <CardContent className="!pt-3 !mt-0">
        <ScrollArea className="h-[300px] w-full pr-4">
          {timeline.map((event, index) => {
            const { node } = event;
            const explorerUrl = resolveExplorerUrl(node.transaction.network, node.transaction.hash);
            
            return (
              <div key={index} className="mb-4 p-3 border rounded-lg relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase bg-secondary px-2 py-1 rounded">
                    {node.interpretation.processedDescription}
                  </span>
                </div>
                <div className="space-y-1">
                  {node.transaction.fromUser && (
                    <p className="text-sm truncate">
                      From: {node.transaction.fromUser.displayName?.value || node.transaction.fromUser.address}
                    </p>
                  )}
                  {node.transaction.toUser && (
                    <p className="text-sm truncate">
                      To: {node.transaction.toUser.displayName?.value || node.transaction.toUser.address}
                    </p>
                  )}
                </div>
                {explorerUrl && (
                  <a 
                    href={explorerUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-2 text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EthTimeline;