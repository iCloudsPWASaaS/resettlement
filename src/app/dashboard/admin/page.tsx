"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-red-600">Admin Dashboard</h1>
      
      <div className="bg-red-50 p-4 rounded-lg mb-6">
        <p className="text-lg font-semibold">
          Welcome to the Admin Control Panel
        </p>
        <p className="mt-2">
          This area is restricted to administrators only. You have full access to all system features.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg mb-2">User Management</h3>
          <p className="text-gray-600 mb-4">Add, edit, or remove users from the system</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Manage Users
          </button>
        </div>
        
        <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg mb-2">System Configuration</h3>
          <p className="text-gray-600 mb-4">Configure system settings and preferences</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            System Settings
          </button>
        </div>
        
        <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg mb-2">Audit Logs</h3>
          <p className="text-gray-600 mb-4">View system activity and user actions</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            View Logs
          </button>
        </div>
        
        <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg mb-2">Database Management</h3>
          <p className="text-gray-600 mb-4">Manage database operations and backups</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Database Tools
          </button>
        </div>
      </div>
    </div>
  );
}