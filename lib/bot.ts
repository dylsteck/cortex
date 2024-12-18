import { createHmac } from 'crypto';

import { type NextRequest } from 'next/server';

import { WebhookData } from './types';

export async function analyzePayload(payload: WebhookData){
  const text = payload.data.text.trimEnd();
  
  if (text.startsWith('@cortex analyze') || text.startsWith('@cortex explain')) {
    return 'Coming soon! For now try out Cortex below: https://withcortex.com';
  }
  
  return 'You can only say @cortex explain or @cortex analyze right now';
}

export async function verifyWebhookSignature(req: NextRequest): Promise<any> {
  const body = await req.text();

  const sig = req.headers.get('X-Neynar-Signature');
  if (!sig) {
    throw new Error('X-Neynar-Signature is missing from the request headers');
  }

  const webhookSecret = process.env.NEYNAR_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('Missing NEYNAR_WEBHOOK_SECRET environment variable');
  }

  const hmac = createHmac('sha512', webhookSecret);
  hmac.update(body);

  const generatedSignature = hmac.digest('hex');

  const isValid = generatedSignature === sig;
  if (!isValid) {
    throw new Error('Invalid Neynar webhook signature');
  }
  return body;
}