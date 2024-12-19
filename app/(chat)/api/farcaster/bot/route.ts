import { NextRequest, NextResponse } from 'next/server';

import { analyzePayload, verifyWebhookSignature } from '@/lib/bot';
import { WebhookData } from '@/lib/types';
import { cortexAPI } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await verifyWebhookSignature(request);
    const payload: WebhookData = JSON.parse(body);
    const response = analyzePayload(payload);
    const signerUUID = process.env.NEYNAR_BOT_SIGNER_UUID;
    if(!signerUUID) {
      return new NextResponse('Missing required environment variable', { status: 500 });
    }
    const cast = await cortexAPI.postCast(signerUUID, response);
    return NextResponse.json(cast);
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new NextResponse('Error handling webhook', { status: 500 });
  }
}