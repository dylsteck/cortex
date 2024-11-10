'use client';

import React from 'react';

import { Button } from '../ui/button';

const actions = [
  {
    title: 'What can you tell me about',
    label: 'aethernet on Farcaster?',
    action: 'What can you tell me about aethernet on Farcaster?',
  },
  {
    title: 'What are some',
    label: 'upcoming events I should go to?',
    action: 'What are some upcoming events I should go to?',
  },
];

export function SuggestedActions({ onActionSelect }: { onActionSelect: (action: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {actions.map((item, index) => (
        <Button
          key={index}
          onClick={() => onActionSelect(item.action)}
          className="text-left p-2 rounded-lg border"
        >
          <strong>{item.title}</strong> {item.label}
        </Button>
      ))}
    </div>
  );
}