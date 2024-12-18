import { NextRequest, NextResponse } from 'next/server';

import { analyzePayload, verifyWebhookSignature } from '@/lib/bot';
import { WebhookData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await verifyWebhookSignature(request);
    const payload: WebhookData = JSON.parse(body);
    const response = await analyzePayload(payload);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new NextResponse('Error handling webhook', { status: 500 });
  }
}