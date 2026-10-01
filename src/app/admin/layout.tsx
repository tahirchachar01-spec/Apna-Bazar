'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthorized(true);
      return;
    }

    // Check auth via cookie or localStorage
    const hasAuthCookie = document.cookie.includes('apna_admin_auth=authenticated');
    const hasAuthStorage = localStorage.getItem('admin_auth') === 'authenticated';

    if (hasAuthCookie || hasAuthStorage) {
      // Ensure cookie is in sync
      if (!hasAuthCookie && hasAuthStorage) {
        document.cookie = `apna_admin_auth=authenticated; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      }
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, isLoginPage, router]);

  // If login page, render children directly
  if (isLoginPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  // Auth checking state
  if (isAuthorized === null || isAuthorized === false) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-4 text-white">
        <div className="animate-spin rounded-full h-9 w-9 border-2 border-brand-brown-light border-t-transparent mb-4" />
        <p className="text-xs text-gray-400">Verifying admin access...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] relative">
      {/* Desktop Persistent Sidebar (Hidden on mobile < lg) */}
      <div className="hidden lg:flex shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-fadeIn">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Sliding Sidebar Content */}
          <div className="relative z-10 w-64 max-w-[80vw] h-full shadow-2xl">
            <AdminSidebar onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
