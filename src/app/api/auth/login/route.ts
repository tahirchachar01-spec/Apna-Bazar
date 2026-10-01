import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Verify exact credentials requested by user:
    // Username: Hamza
    // Password: Mahnoor ghanjay ki beeti
    if (cleanUser === 'hamza' && cleanPass === 'Mahnoor ghanjay ki beeti') {
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          username: 'Hamza',
          role: 'Administrator',
        },
      });

      // Set cookie for 7 days
      response.cookies.set('apna_admin_auth', 'authenticated', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
        httpOnly: false, // accessible to client check and middleware
      });

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Invalid username or password. Please check your credentials.',
      },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Authentication error: ' + (err.message || 'Unknown error'),
      },
      { status: 500 }
    );
  }
}
