"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <span className="text-indigo-600">Resettlement App</span>
        </h1>

        <p className="mt-3 text-2xl">
          A role-based authentication and dashboard system
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link
            href="/login"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-indigo-600 focus:text-indigo-600"
          >
            <h3 className="text-2xl font-bold">Login &rarr;</h3>
            <p className="mt-4 text-xl">
              Sign in to access your dashboard.
            </p>
          </Link>

          <Link
            href="/register"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-indigo-600 focus:text-indigo-600"
          >
            <h3 className="text-2xl font-bold">Register &rarr;</h3>
            <p className="mt-4 text-xl">
              Create a new account to get started.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}