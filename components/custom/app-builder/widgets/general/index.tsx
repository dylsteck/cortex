import { ImageWidget, imageWidgetSchema } from './image';
import { TextWidget, textWidgetSchema } from './text';

export const generalWidgets = {
  text: {
    component: TextWidget,
    params: textWidgetSchema,
    name: 'Text',
    description: 'Add text content with consistent styling',
  },
  image: {
    component: ImageWidget,
    params: imageWidgetSchema,
    name: 'Image',
    description: 'Display an image from a URL',
  },
} as const;
