import { openai } from '@ai-sdk/openai';
import { xai } from '@ai-sdk/xai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { cookies } from 'next/headers';
import { createOllama } from 'ollama-ai-provider';

import { type Model } from '@/lib/model';

import { customMiddleware } from './custom-middleware';

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
