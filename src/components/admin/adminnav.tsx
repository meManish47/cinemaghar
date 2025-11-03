"use client";
import Link from "next/link";
import AdminNavBar from "./adminNavBar";

export default function AdminNav() {
  return (
    <nav className="w-60 bg-gray-900 text-white min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold">🎬 Admin</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/admin/cinemas" className="hover:text-red-400">
            Cinemas
          </Link>
        </li>
        <li>
          <Link href="/admin/halls" className="hover:text-red-400">
            Halls
          </Link>
        </li>
        
        <li>
          <Link href="/admin/shows" className="hover:text-red-400">
            Shows
          </Link>
        </li>
      </ul>
    </nav>
  );
}
