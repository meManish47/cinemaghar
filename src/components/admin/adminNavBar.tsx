"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminNavBar() {
  return (
    <div className="h-10 max-w-screen px-32 bg-[#F5F5F5] border-1">
      <div className="w-120 h-full px-3  flex gap-2 text-gray-600 items-center ">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={"/"}>
              <DropdownMenuItem>Home</DropdownMenuItem>
            </Link>
            <Link href={"/admin/cinemas"}>
              <DropdownMenuItem>Cinemas</DropdownMenuItem>
            </Link>
            <Link href={"/admin/halls"}>
              <DropdownMenuItem>Halls</DropdownMenuItem>
            </Link>

            <Link href={"/admin/shows"}>
              <DropdownMenuItem>Shows</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
