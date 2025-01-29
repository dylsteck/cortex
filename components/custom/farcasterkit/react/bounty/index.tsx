import { CalendarIcon, ExternalLinkIcon } from "lucide-react"
import React from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { Bounty as BountyType } from '../../common/types'

export function Bounty({ bounty }: { bounty: BountyType }) {
  const hasReward = bounty.reward_summary?.token?.symbol && bounty.reward_summary?.unit_amount;

  return (
    <div className="cursor-pointer" onClick={() => window.open(`https://bountycaster.xyz${bounty.links.resource}`, '_blank')}>
      <div className="w-full rounded-lg flex flex-col shrink-0 shadow-lg hover:shadow-xl transition-shadow duration-200 p-2">
        <div className="flex-none pb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-lg font-medium pt-1">
                <a href={bounty.links.external} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {bounty.title}
                </a>
              </div>
              <div className="flex items-center space-x-2 mt-2">
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
        <div className="space-y-3 relative pb-0">
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
            {bounty.summary_text.length > 200 ? `${bounty.summary_text.substring(0, 200)}...` : bounty.summary_text}
          </div>
        </div>
      </div>
    </div>
  )
}