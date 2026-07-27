import React from 'react';
import { cookies } from 'next/headers';
import { AdminHeader } from '@/components/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_session_token');
  const isAuthenticated = token?.value === 'authenticated_admin_token_active';

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {isAuthenticated ? (
        <div className="min-h-screen flex flex-col">
          <AdminHeader />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      ) : (
        <div className="w-full min-h-screen bg-[#f8fafc]">
          {children}
        </div>
      )}
    </div>
  );
}
