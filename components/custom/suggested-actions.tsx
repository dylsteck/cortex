'use client';

import React from 'react';

import { Button } from '../ui/button';

const actions = [ 
  'Show me some upcoming events', 
  'Which Clanker tokens are trending?',
  `What's happening on Farcaster?`,
];

export function SuggestedActions({ onActionSelect }: { onActionSelect: (action: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      {actions.map((item, index) => (
        <Button
          key={index}
          onClick={() => onActionSelect(item)}
          className="text-left p-2 px-3 rounded-lg border"
        >
          {item}
        </Button>
      ))}
    </div>
  );
}