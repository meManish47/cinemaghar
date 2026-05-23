"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import {
  IoIosRefresh,
  IoMdHelpCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { LuTicket } from "react-icons/lu";
import { MdCreditCard } from "react-icons/md";
import { PiFilmSlateDuotone } from "react-icons/pi";
import { TbGift } from "react-icons/tb";
import SidebarItem from "./sidebaritem";
import { User } from "../../../generated/prisma";
import SignIn from "../header/clerkSignIn";

export default function UserSidebar({ userDb }: { userDb: User | null }) {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <>
      <button
        className=" text-3xl z-2001 text-gray-700 hover:text-black transition"
        onClick={() => setOpen(!open)}
      >
        <IoMenu />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-[1px] z-2000" />
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-[85%] 
        bg-white shadow-[0_0_35px_rgba(0,0,0,0.35)] 
        p-6 z-2002 transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-xl font-bold mb-4">
          Hey! {userDb ? userDb.name : <SignIn />}
        </h2>

        <div className="flex justify-between items-center bg-linear-to-r from-pink-500 to-orange-400 text-white rounded-lg py-3 px-4 mb-6">
          <span className="text-sm font-medium">
            Unlock special offers &amp; rewards
          </span>
        </div>

        <ul className="text-gray-700 text-[15px]">
          <SidebarItem
            icon={<IoMdNotificationsOutline size={22} />}
            text="Notifications"
            locked
          />
          <SidebarItem
            icon={<LuTicket size={20} />}
            text="Your Orders"
            locked
          />
          <SidebarItem
            icon={<PiFilmSlateDuotone size={22} />}
            text="Stream Library"
            locked
          />
          <SidebarItem
            icon={<MdCreditCard size={22} />}
            text="Play Credit Card"
            locked
          />
          <SidebarItem
            icon={<IoMdHelpCircleOutline size={22} />}
            text="Help & Support"
            locked
          />
          <SidebarItem
            icon={<HiOutlineCog6Tooth size={22} />}
            text="Accounts & Settings"
            locked
          />
          <SidebarItem icon={<TbGift size={22} />} text="Rewards" locked/>
          <SidebarItem icon={<IoIosRefresh size={22} />} text="BookAChange" locked/>
        </ul>
      </div>
    </>
  );
}
