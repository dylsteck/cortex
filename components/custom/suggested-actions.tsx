'use client'

import { Sparkles } from 'lucide-react'
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
    <div className="relative w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-row gap-2 items-center justify-center mb-3">
        <Sparkles className="size-5 text-black dark:text-white" />
        <p className="text-center text-lg font-medium">Examples</p>
      </div>
      <div className="flex flex-col md:flex-row gap-3 max-h-[300px] md:max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-accent/30 hover:scrollbar-thumb-accent/50">
        {actions.map((item, index) => (
          <Button
            key={index}
            onClick={() => onActionSelect(item)}
            variant="outline"
            size="lg"
            className="flex-1 basis-auto md:basis-64 text-left p-4 h-auto bg-background/50 backdrop-blur-sm border-accent/20 hover:border-accent hover:bg-accent/10 transition-all duration-200"
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  )
}