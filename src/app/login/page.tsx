"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [selectedAccountType, setSelectedAccountType] = useState("");

  const handleNext = () => {
    if (selectedAccountType) {
      // Navigate to the actual login form with the selected account type
      router.push(`/login/form?type=${selectedAccountType}`);
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

        {/* Account Type Selection */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Select account type
            </h2>
            <p className="text-sm text-gray-600">
              Choose the type of account you want to create.
            </p>
          </div>

          {/* Radio Button Options */}
          <div className="space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="accountType"
                value="user"
                checked={selectedAccountType === "user"}
                onChange={(e) => setSelectedAccountType(e.target.value)}
                className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
              />
              <span className="text-gray-900">User</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="accountType"
                value="hmpps"
                checked={selectedAccountType === "hmpps"}
                onChange={(e) => setSelectedAccountType(e.target.value)}
                className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
              />
              <span className="text-gray-900">HMPPS Practitioner</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="accountType"
                value="service-provider"
                checked={selectedAccountType === "service-provider"}
                onChange={(e) => setSelectedAccountType(e.target.value)}
                className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
              />
              <span className="text-gray-900">Service Provider</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="accountType"
                value="resettlement-admin"
                checked={selectedAccountType === "resettlement-admin"}
                onChange={(e) => setSelectedAccountType(e.target.value)}
                className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
              />
              <span className="text-gray-900">Resettlement Admin</span>
            </label>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!selectedAccountType}
            className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
          >
            Next
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login/form" className="text-pink-600 hover:text-pink-700 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}