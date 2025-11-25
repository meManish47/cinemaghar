"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

export default function AdminNavBar() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Cinemas", href: "/admin/cinemas" },
    { label: "Halls", href: "/admin/halls" },
    { label: "Shows", href: "/admin/shows" },
  ];
  return (
    <div className="h-10 max-w-screen px-2 sm:px-32 bg-[#F5F5F5] border-1">
      <div className="w-max sm:w-120 h-full px-3  flex gap-2 text-gray-600 items-center ">
        {/* <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="text-sm sm:text-normal cursor-pointer">
            Menu
          </DropdownMenuTrigger>
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
        </DropdownMenu> */}

        <nav className="flex text-sm sm:text-normal ">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-1 sm:px-6  transition 
                        ${active ? "underline" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
