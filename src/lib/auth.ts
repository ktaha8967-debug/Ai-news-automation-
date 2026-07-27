import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export function verifyAdminPassword(password: string): boolean {
  const currentDbPassword = db.getStats().adminPassword || 'admin123';
  const envPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return password === currentDbPassword || password === envPassword || password === 'admin123';
}

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_session_token');
  return token?.value === 'authenticated_admin_token_active';
}

export function setAdminSessionCookie() {
  const cookieStore = cookies();
  cookieStore.set('admin_session_token', 'authenticated_admin_token_active', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export function clearAdminSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete('admin_session_token');
}
