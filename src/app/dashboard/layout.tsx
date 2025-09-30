"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <p>Please wait while we load your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Resettlement</h2>
          <p className="text-indigo-200 text-sm">
            Welcome, {session?.user?.name || session?.user?.email}
          </p>
          <p className="text-indigo-200 text-xs mt-1 uppercase">
            Role: {session?.user?.role || "User"}
          </p>
        </div>
        <nav className="mt-6">
          <Link
            href="/dashboard"
            className="block py-3 px-6 hover:bg-indigo-700 transition duration-200"
          >
            Dashboard Home
          </Link>
          
          {/* Role-specific navigation links */}
          {session?.user?.role === "ADMIN" && (
            <>
              <Link
                href="/dashboard/admin"
                className="block py-3 px-6 hover:bg-indigo-700 transition duration-200"
              >
                Admin Panel
              </Link>
              <Link
                href="/dashboard/users"
                className="block py-3 px-6 hover:bg-indigo-700 transition duration-200"
              >
                User Management
              </Link>
            </>
          )}
          
          {(session?.user?.role === "ADMIN" || session?.user?.role === "MANAGER") && (
            <Link
              href="/dashboard/reports"
              className="block py-3 px-6 hover:bg-indigo-700 transition duration-200"
            >
              Reports
            </Link>
          )}
          
          {(session?.user?.role === "ADMIN" || session?.user?.role === "MANAGER" || session?.user?.role === "ANALYST") && (
            <Link
              href="/dashboard/analytics"
              className="block py-3 px-6 hover:bg-indigo-700 transition duration-200"
            >
              Analytics
            </Link>
          )}
          
          <Link
            href="/dashboard/profile"
            className="block py-3 px-6 hover:bg-indigo-700 transition duration-200"
          >
            My Profile
          </Link>
          
          <button
            onClick={() => router.push("/api/auth/signout")}
            className="w-full text-left block py-3 px-6 hover:bg-indigo-700 transition duration-200"
          >
            Sign Out
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}