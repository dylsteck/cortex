import React from 'react';
import { z } from 'zod';

import { Widget } from '../widget';

interface TextWidgetProps {
  text: string;
  className?: string;
}

export function TextWidget({ text, className }: TextWidgetProps) {
  return (
    <Widget className={className}>
      <div className="p-4">
        <p className="text-base">{text}</p>
      </div>
    </Widget>
  );
}

export const textWidgetSchema = z.object({
  text: z.string().min(1, 'Text is required')
});
