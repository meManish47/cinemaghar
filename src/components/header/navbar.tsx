"use client";
import Link from "next/link";
import { toast } from "sonner";
function handleClick() {
  toast.info("Coming Soon!!");
}
export default function NavBar() {
  return (
    <div className="h-10 flex justify-between px-8 sm:px-32 bg-[#F5F5F5] border">
      <div className=" w-max sm:w-120 h-full px-3  flex gap-8 text-sm text-gray-800 items-center ">
        <Link href={"/"}>
          <p className="cursor-pointer font-bold ">Movies</p>
        </Link>
        <span onClick={handleClick}>
          <p className="cursor-pointer disabled">Stream</p>
        </span>
        <span onClick={handleClick}>
          <p className="cursor-pointer">Events</p>
        </span>
        <span onClick={handleClick}>
          <p className="cursor-pointer">Plays</p>
        </span>
        <span onClick={handleClick}>
          <p className="cursor-pointer">Sports</p>
        </span>
      </div>
      <div className=" w-max  h-full px-3  flex gap-8 text-xs text-gray-800 items-center ">
        <span>
          <p className="cursor-pointer text-muted-foreground">Offers</p>
        </span>
        <span>
          <p className="cursor-pointer text-muted-foreground">Gift Cards</p>
        </span>
      </div>
    </div>
  );
}
