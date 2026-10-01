import { NextResponse } from 'next/server';
import { testGitHubConnection } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const status = await testGitHubConnection();
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      {
        configured: false,
        connected: false,
        message: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
