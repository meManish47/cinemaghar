"use client";
import Link from "next/link";

export default function AdminNav() {
  return (
    <nav className="w-60 bg-gray-900 text-white h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold">🎬 Admin</h1>
      <ul className="space-y-2">
        <li><Link href="/admin/cinemas" className="hover:text-red-400">Cinemas</Link></li>
        <li><Link href="/admin/halls" className="hover:text-red-400">Halls</Link></li>
        <li><Link href="/admin/seats" className="hover:text-red-400">Seats</Link></li>
      </ul>
    </nav>
  );
}
