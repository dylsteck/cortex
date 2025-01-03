'use client'

import React from 'react'

import { Button } from '../ui/button'

const actions = [
  'Show me some upcoming events',
  'What Clanker tokens are trending?',
  'Search for AI discussions on Farcaster',
  'What casts are trending right now?',
  'How do I build a bot with Neynar?',
  'Get Farcaster profile info for vitalik.eth',
  'What are the latest casts from dwr.eth?',
  'Show me casts from the fc-devs channel',
  'Find open bounties this week',
]

export function SuggestedActions({ onActionSelect }: { onActionSelect: (action: string) => void }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-row gap-2 items-center justify-start 2xl:justify-center px-4 py-2 space-x-2">
        {actions.map((item, index) => (
          <Button
            key={index}
            onClick={() => onActionSelect(item)}
            variant="outline"
            size="sm"
            className="text-xs px-2 py-1 h-auto whitespace-nowrap bg-background/50 backdrop-blur-sm border-foreground/40 border-[1.5px] hover:border-foreground hover:bg-foreground/10 transition-all duration-200"
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  )
}