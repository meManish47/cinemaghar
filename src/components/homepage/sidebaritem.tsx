import type { ReactNode } from "react";
import { PiLockDuotone } from "react-icons/pi";
export default function SidebarItem({
  icon,
  text,
  locked = false,
}: {
  icon: ReactNode;
  text: string;
  locked?: boolean;
}) {
  return (
    <li
      className={`flex items-center gap-3 py-3 border-b group transition
      ${locked ? "text-gray-400 cursor-not-allowed" : "hover:text-black"}`}
    >
      <span className={`${locked ? "opacity-40" : ""}`}>{icon}</span>
      <span className="flex-1">{text}</span>
      {locked && <PiLockDuotone size={18} className="opacity-50" />}
    </li>
  );
}
