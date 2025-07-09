import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  console.log('🧪 Test API route called');
  
  return NextResponse.json({
    message: 'API routes are working on Netlify!',
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      NETLIFY: process.env.NETLIFY,
      NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
    }
  });
}

export async function POST(request: NextRequest) {
  console.log('🧪 Test API POST route called');
  
  const body: unknown = await request.json().catch(() => ({}));
  
  return NextResponse.json({
    message: 'API POST routes are working on Netlify!',
    receivedData: body,
    timestamp: new Date().toISOString(),
  });
}

export const runtime = 'nodejs';
