'use client'

import React from 'react'

import { Button } from '../ui/button'

const actions = [
  'Show me some upcoming events',
  'What livestreams are happening now?',
  'Search for AI discussions on Farcaster',
  'Show me trending casts',
  'Get profile info for vitalik.eth',
  'What are the latest casts from dwr.eth?',
  'Show me posts from the AI channel',
  'Find active bounties this week',
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