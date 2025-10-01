"use client";

import { useSession } from 'next-auth/react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import AdminForms from '../components/AdminForms';

export default function ServiceProviders() {
  const { data: session } = useSession();
  const { user } = useAuth();

  // Check if user is admin
  const isAdmin = (session?.user as any)?.role === 'ADMIN' || user?.role === 'ADMIN';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">Add Service Provider</h1>
          <p className="text-gray-600 mt-2">
            {isAdmin 
              ? "Manage website information, services, and gallery content for your organization."
              : "You need administrator privileges to access this page."
            }
          </p>
        </div>

        {/* Admin Forms - Only visible to admins */}
        {isAdmin ? (
          <AdminForms />
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              You need administrator privileges to manage service providers. Please contact your system administrator if you believe you should have access to this page.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                Current Role: <span className="font-medium">{session?.user?.role || user?.role || 'USER'}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}