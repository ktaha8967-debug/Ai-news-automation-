import React from 'react';
import { cookies } from 'next/headers';
import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_session_token');
  const isAuthenticated = token?.value === 'authenticated_admin_token_active';

  return (
    <div className="min-h-screen bg-[#070a11] text-slate-100 font-sans">
      {isAuthenticated ? (
        <div className="min-h-screen flex">
          <AdminSidebar />
          <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-[#070a11]">
            {children}
          </main>
        </div>
      ) : (
        <div className="w-full min-h-screen bg-[#070a11]">
          {children}
        </div>
      )}
    </div>
  );
}
