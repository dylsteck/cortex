import { CalendarIcon, ExternalLinkIcon } from "lucide-react"
import React from 'react';

import { ToolResponse, ToolResponseHeader, ToolResponseBody, ToolResponseCard } from '@/components/custom/tool-response';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Bounty } from '@/lib/types';

export function FarcasterBounty({ bounty }: { bounty: Bounty }) {
  const hasReward = bounty.reward_summary?.token?.symbol && bounty.reward_summary?.unit_amount;

  return (
    <ToolResponseCard onClick={() => window.open(bounty.links.external, '_blank')}>
      <div className="w-[300px] md:w-[400px] flex flex-col shrink-0">
        <div className="flex-none pb-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-lg font-bold">
                <a href={bounty.links.external} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {bounty.title}
                </a>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                {hasReward && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {bounty.reward_summary.unit_amount} {bounty.reward_summary.token.symbol}
                  </Badge>
                )}
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <CalendarIcon className="size-4" />
                  <span>{new Date(bounty.expiration_date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2 relative pb-0">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={bounty.poster.profile_picture} alt={bounty.poster.display_name} />
              <AvatarFallback>{bounty.poster.display_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{bounty.poster.display_name}</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {bounty.summary_text}
          </div>
        </div>
        <a 
          href={bounty.links.external} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute bottom-2 right-2 text-muted-foreground hover:text-foreground"
        >
          <ExternalLinkIcon className="size-4" />
        </a>
      </div>
    </ToolResponseCard>
  )
}

export function FarcasterBounties({ bounties }: { bounties: Bounty[] }) {
  return (
    <ToolResponse>
      <ToolResponseHeader text="Farcaster Bounties" />
      <ToolResponseBody>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {bounties.map((bounty) => (
              <FarcasterBounty key={bounty.uid} bounty={bounty} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </ToolResponseBody>
    </ToolResponse>
  );
}