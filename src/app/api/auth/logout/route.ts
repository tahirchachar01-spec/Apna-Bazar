import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  // Clear cookie
  response.cookies.set('apna_admin_auth', '', {
    path: '/',
    maxAge: 0,
  });

  return response;
}
