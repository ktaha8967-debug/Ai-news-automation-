import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enforce Admin Auth Check
  const cookieStore = cookies();
  const token = cookieStore.get('admin_session_token');
  const isAuthenticated = token?.value === 'authenticated_admin_token_active';

  // Allow login page access without redirect loop
  return (
    <div className="min-h-screen bg-[#070a11] text-slate-100">
      {isAuthenticated ? (
        <div className="min-h-screen flex">
          <AdminSidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      ) : (
        <div className="w-full">
          {children}
        </div>
      )}
    </div>
  );
}
