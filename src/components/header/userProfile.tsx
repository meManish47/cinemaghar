// CustomUserProfile.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  FaUserCircle,
  FaClipboardList,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import { Button } from "../ui/button";
import {
  UserProfile as ClerkUserProfile,
  SignOutButton,
} from "@clerk/clerk-react";

export default function CustomUserProfile() {
  return (
    <ClerkUserProfile>
      {/* You can optionally pass appearance props here if needed */}
      <div className="drawer drawer-end overflow-hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Trigger Button */}
          <label
            htmlFor="my-drawer"
            className="flex items-center cursor-pointer drawer-button"
          >
            <FaUserCircle size={32} color="gray" />
          </label>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="bg-white text-base-content min-h-full w-80 flex flex-col justify-between py-4">
            {/* Profile Header */}
            <div className="h-full w-full flex flex-col text-base-content">
              <div className="p-5 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-700">Hey!</h2>
                <button className="text-sm text-gray-500 hover:underline cursor-pointer">
                  Edit Profile
                </button>
              </div>

              {/* Sidebar Menu */}
              <ul className="w-full p-0 flex-1 text-gray-700">
                <li>
                  <a
                    className="w-full h-24 flex items-center space-x-3 px-5 py-4 hover:bg-gray-100 rounded-md transition-colors"
                    href="/"
                  >
                    <FaClipboardList size={20} />
                    <div className="flex flex-col justify-center gap-1">
                      <p className="text-base">Your Orders</p>
                      <p className="text-muted-foreground text-xs">
                        View all your bookings and purchases
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <Link
                    href="/"
                    className="flex items-center space-x-3 px-5 py-4 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <FaCog size={20} />
                    <div className="flex flex-col justify-center gap-1">
                      <p className="text-base">Account and Settings</p>
                      <p className="text-muted-foreground text-xs">
                        Locations, Personalizations, and more
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="flex items-center space-x-3 px-5 py-4 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <FaQuestionCircle size={20} />
                    <div className="flex flex-col justify-center gap-1">
                      <p className="text-base">Help and Support</p>
                      <p className="text-muted-foreground text-xs">
                        Chat with support
                      </p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sign Out */}
            <div className="mx-2">
              <SignOutButton>
                <Button
                  className="cursor-pointer h-12 w-full text-red-400 border-red-500 hover:text-red-600"
                  variant="outline"
                >
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </div>
    </ClerkUserProfile>
  );
}
