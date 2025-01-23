'use client'

import React from 'react'

import { Button } from '../ui/button'

const actions = [
  'Show me some upcoming events',
  'What Clanker tokens are trending?',
  'Look up AI discussions',
  'What casts are trending right now?',
  'Show me casts from the fc-devs channel',
  'Find open bounties this week',
  'Who is @v?',
  'What are the latest casts from dwr.eth?',
  'How do I build a bot with Neynar?'
]

export function SuggestedActions({ onActionSelect }: { onActionSelect: (action: string) => void }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-row gap-2 items-center justify-start 2xl:justify-center px-4 py-1 space-x-1.5">
        {actions.map((item, index) => (
          <Button
            key={index}
            onClick={() => onActionSelect(item)}
            variant="outline"
            size="sm"
            className="rounded-full text-xs px-3 py-1.5 h-auto whitespace-nowrap bg-background/50 backdrop-blur-sm border-foreground/40 border-[1.5px] hover:border-foreground hover:bg-foreground/10 transition-all duration-200"
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  )
}