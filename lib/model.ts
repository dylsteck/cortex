// Define your models here.
export const models = [
  {
    label: 'GPT 4o',
    name: 'gpt-4o',
    description: 'For complex, multi-step tasks',
  },
  {
    label: 'GPT 4o mini',
    name: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
  },
] as const;

export const DEFAULT_MODEL_NAME: Model['name'] = 'gpt-4o';

export type Model = (typeof models)[number];
