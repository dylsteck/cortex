import Image from 'next/image';
import React from 'react';
import { z } from 'zod';

import { Widget } from '../widget';

interface ImageWidgetProps {
  imageUrl: string;
  className?: string;
}

export const imageParamsMetadata = {
  imageUrl: {
    label: 'Image URL',
    description: 'The URL of the image to display',
    placeholder: 'https://example.com/image.jpg'
  }
};

export const imageWidgetSchema = z.object({
  imageUrl: z.string()
    .url('Please enter a valid URL')
    .describe('The URL of the image to display')
});

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

export const ImageWidgetPreview = () => (
  <Widget>
    <div className="relative size-full">
      <Image
        src="https://picsum.photos/200"
        alt="Preview image"
        fill
        style={{ objectFit: 'contain' }}
        className="p-2"
      />
    </div>
  </Widget>
);
