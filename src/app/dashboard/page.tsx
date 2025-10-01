"use client";

import { useSession } from "next-auth/react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { data: session } = useSession();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Explore Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 hidden">
        {/* Large Featured Card */}
        <div className="md:col-span-2 lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-orange-100 to-orange-200">
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Victims Given Greater Access To Justice Through Legal Aid
                </h3>
                <p className="text-sm text-gray-600">
                  New initiatives provide enhanced legal support for victims seeking justice...
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span>📅 17th March 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Small Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-blue-900 to-blue-800">
              <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                <div>
                  <h4 className="font-semibold text-sm mb-1">
                    New Court Approach Helping Drug Offenders Off Drugs
                  </h4>
                </div>
                <div className="text-xs opacity-80">
                  📅 17th March 2024
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-orange-600 to-orange-500">
              <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                <div>
                  <h4 className="font-semibold text-sm mb-1">
                    Dinner To Celebrate Local Probation Team
                  </h4>
                </div>
                <div className="text-xs opacity-80">
                  📅 17th March 2024
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-green-600 to-green-500">
            <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
              <div>
                <h4 className="font-semibold text-sm mb-1">
                  Giving Back To Community
                </h4>
              </div>
              <div className="text-xs opacity-80">
                📅 17th March 2024
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-yellow-500 to-yellow-400">
            <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
              <div>
                <h4 className="font-semibold text-sm mb-1">
                  Opportunities for Work Experience
                </h4>
              </div>
              <div className="text-xs opacity-80">
                📅 17th March 2024
              </div>
            </div>
          </div>
        </div>

        {/* Large Bottom Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  An extraordinary journey someone you
                </h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                    HM Prison & Probation Service
                  </span>
                </div>
              </div>
              <div className="text-xs opacity-80">
                📅 17th March 2024
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prison and Probation Jobs Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-lg p-6 text-white hidden">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Prison and Probation Jobs</h2>
            <p className="text-pink-100 mb-4 max-w-md">
              Be A Catalyst For Change Behind Bars, Join Our Team At Prison, Helping And Helping Offenders Build A Brighter Tomorrow.
            </p>
            <p className="text-pink-100 mb-6 max-w-md text-sm">
              Join Us In Creating A Safer, More Rehabilitative Environment For Everyone Involved. Take The First Step Towards A Rewarding Career - Apply Today.
            </p>
            <button className="bg-white text-pink-600 px-6 py-2 rounded-lg font-medium hover:bg-pink-50 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}