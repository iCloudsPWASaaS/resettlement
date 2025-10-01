"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountType = searchParams.get('type');
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      // Redirect all users to the regular dashboard
      router.push("/dashboard");
    } catch (error) {
      setError("An error occurred during login");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-8 px-4 bg-gray-50">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo.PNG"
            alt="Resettlement Logo"
            width={200}
            height={100}
            className="h-auto"
            unoptimized
          />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Sign in to your account
            </h2>
            {accountType && (
              <p className="text-sm text-gray-600">
                Account type: {accountType === 'hmpps' ? 'HMPPS Practitioner' : accountType === 'service-provider' ? 'Service Provider' : 'User'}
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-pink-600 hover:text-pink-700 font-medium">
                Register
              </Link>
            </p>
          </div>

          <div className="text-center mt-4">
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700">
              ← Back to account type selection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}