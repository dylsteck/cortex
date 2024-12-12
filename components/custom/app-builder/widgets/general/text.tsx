import React, { useState } from 'react';
import { z } from 'zod';

import { Widget } from '../widget';

interface TextWidgetProps {
  text: string;
  className?: string;
}

export function TextWidget({ text, className }: TextWidgetProps) {
  const [editableText, setEditableText] = useState(text);

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    setEditableText(event.currentTarget.textContent || '');
  };

  return (
    <Widget className={className}>
      <div className="p-4">
        <div
          className="text-base"
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
        >
          {editableText || 'Add note...'}
        </div>
      </div>
    </Widget>
  );
}

export const textWidgetSchema = z.object({
  text: z.string().min(1, 'Text is required')
});