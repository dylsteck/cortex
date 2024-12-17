'use server';

import { cookies } from 'next/headers';

export async function saveModel(model: string) {
  const cookieStore = await cookies();
  const prevValue = cookieStore.get('model')?.value;
  if (prevValue === 'ollama') {
    await clearOllamaConfig();
  }
  cookieStore.set('model', model);
}

export async function saveOllamaConfig(apiUrl: string, model: string) {
  const cookieStore = await cookies();
  cookieStore.set('model', 'ollama');
  cookieStore.set('ollamaApiUrl', apiUrl);
  cookieStore.set('ollamaModel', model);
}

export async function clearOllamaConfig() {
  const cookieStore = await cookies();
  cookieStore.delete('ollamaApiUrl');
  cookieStore.delete('ollamaModel');
}

export async function getOllamaConfig() {
  const cookieStore = await cookies();
  const modelCookie = cookieStore.get('model')?.value;
  if (modelCookie === 'ollama') {
    const ollamaApiUrl = cookieStore.get('ollamaApiUrl')?.value || '';
    const ollamaModel = cookieStore.get('ollamaModel')?.value || '';
    return { ollamaApiUrl, ollamaModel };
  }
  return null;
}