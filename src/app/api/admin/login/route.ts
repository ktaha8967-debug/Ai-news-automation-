import { NextResponse } from 'next/server';
import { validateAdminCredentials } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (validateAdminCredentials(username, password)) {
      const response = NextResponse.json({ success: true, message: 'Authentication successful' });
      response.cookies.set('admin_session_token', 'authenticated_admin_token_active', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      return response;
    }

    return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'Server error during authentication' }, { status: 500 });
  }
}
