import { NextRequest, NextResponse } from 'next/server';

import { verifyWebhookSignature } from '@/lib/webhook';

export async function POST(request: NextRequest) {
  try {
    const body = await verifyWebhookSignature(request);
    const payload = JSON.parse(body);
    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new NextResponse('Error handling webhook', { status: 500 });
  }
}