import Image from 'next/image';
import React from 'react';
import { z } from 'zod';

import { Widget } from '../widget';

interface ImageWidgetProps {
  imageUrl: string;
  className?: string;
}

export function ImageWidget({ imageUrl, className }: ImageWidgetProps) {
  return (
    <Widget className={className}>
      <div className="relative size-full">
        <Image
          src={imageUrl}
          alt="Widget image"
          fill
          style={{ objectFit: 'contain' }}
          className="p-2"
        />
      </div>
    </Widget>
  );
}

export const imageWidgetSchema = z.object({
  imageUrl: z.string().url('Please enter a valid URL')
});
