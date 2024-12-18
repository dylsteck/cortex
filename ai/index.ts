import { createOpenAI, openai } from '@ai-sdk/openai';
import { xai } from '@ai-sdk/xai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { cookies } from 'next/headers';
import { createOllama } from 'ollama-ai-provider';

import { type Model } from '@/lib/model';

import { customMiddleware } from './custom-middleware';

const cerebras = createOpenAI({
  name: 'cerebras',
  apiKey: process.env.CEREBRAS_API_KEY ?? '',
  baseURL: 'https://api.cerebras.ai/v1',
});

export const customModel = async(modelName: Model['name']) => {
  const cookieStore = await cookies();
  const modelCookie = cookieStore.get('model')?.value;
  const ollamaApiUrl = cookieStore.get('ollamaApiUrl')?.value;
  const ollamaModel = cookieStore.get('ollamaModel')?.value;
  
  const modelProvider = () => {
    switch (modelCookie) {
      case 'ollama':
        if(ollamaApiUrl && ollamaModel){
          return createOllama({ baseURL: ollamaApiUrl })(ollamaModel);
        }
      case 'cerebras': 
        return cerebras('llama-3.3-70b');
      case 'grok-2-1212':
        return xai('grok-2-1212');
      default:
        return openai(modelName);
    }
  }

  return wrapLanguageModel({
    model: modelProvider(),
    middleware: customMiddleware,
  });
};
