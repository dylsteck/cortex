import { openai } from '@ai-sdk/openai';
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
  const modelProvider = modelCookie === 'ollama' && ollamaApiUrl && ollamaModel
    ? createOllama({ baseURL: ollamaApiUrl })(ollamaModel)
    : openai(modelName);

  return wrapLanguageModel({
    model: modelProvider,
    middleware: customMiddleware,
  });
};
