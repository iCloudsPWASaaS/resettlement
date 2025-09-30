"use client";

import { useSession } from "next-auth/react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { data: session } = useSession();
  const { user } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-lg font-semibold">
          Welcome, {session?.user?.name || user?.name || "User"}!
        </p>
        <p className="mt-2">
          You are logged in as a {session?.user?.role || user?.role || "USER"}.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg mb-2">My Profile</h3>
          <p className="text-gray-600 mb-4">View and edit your profile information</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            View Profile
          </button>
        </div>
        
        <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg mb-2">My Activities</h3>
          <p className="text-gray-600 mb-4">View your recent activities and history</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            View Activities
          </button>
        </div>
      </div>
    </div>
  );
}