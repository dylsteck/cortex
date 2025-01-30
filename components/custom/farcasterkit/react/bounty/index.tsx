import { AwardIcon, CalendarIcon, ExternalLinkIcon } from "lucide-react"
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
        <div className="flex-none">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-medium pt-1">
                {bounty.title}
              </p>
            </div>
          </div>
          {hasReward ? (
            <p className="text-md pt-1 flex flex-row gap-1 items-center">
              <AwardIcon className="size-3.5" /> <span className="font-medium">{bounty.reward_summary.unit_amount} {bounty.reward_summary.token.symbol}</span>
            </p>
          ): null}
        </div>
        <div>
          <div className="py-2 flex items-center space-x-1">
            <Avatar className="size-5">
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