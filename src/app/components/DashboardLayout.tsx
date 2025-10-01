"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUsers,
  faUser,
  faComments,
  faHandshake,
  faBuilding,
  faStar,
  faBriefcase,
  faSearch,
  faCog,
  faBell,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.PNG"
              alt="Resettlement Logo"
              width={200}
              height={100}
              className="h-auto"
              unoptimized
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-lg"
              >
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="w-4 h-4 text-pink-600"
                />
                <span>Overview</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
                <span>Contacts</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FontAwesomeIcon icon={faComments} className="w-4 h-4" />
                <span>Messages</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FontAwesomeIcon icon={faHandshake} className="w-4 h-4" />
                <span>Meet</span>
              </a>
            </li>
            <li>
              <a
                href="/service-providers"
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FontAwesomeIcon icon={faBuilding} className="w-4 h-4" />
                <span>Service Providers</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
                <span>Features</span>
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                <span>My Profile</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {(session?.user?.name || user?.name || "U")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user?.name || user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user?.role || user?.role || "USER"}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="mt-3 w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="w-4 h-4 text-gray-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>

            {/* Right Side - Filter and Profile */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faBell} className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {(session?.user?.name || user?.name || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}