'use client';

import React from 'react';

import { Button } from '../ui/button';

const actions = [ 
  'What can you tell me about aethernet on Farcaster?', 
  'What are some upcoming events I should go to?',
  `What's the weather in San Francisco?`,
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