import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const AUTH_COOKIE = 'admin_session_token';

export function validateAdminCredentials(username: string, pass: string): boolean {
  return (
    (username.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase() || username.trim().toLowerCase() === 'admin@ainews.org') &&
    pass === ADMIN_PASSWORD
  );
}

export function isServerAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_COOKIE);
    return token?.value === 'authenticated_admin_token_active';
  } catch {
    return false;
  }
}
