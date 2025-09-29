import Link from "next/link";

export default function NavBar() {
  return (
    <div className="h-10 px-32 bg-[#F5F5F5] border-1">
        <div className="w-120 h-full px-3  flex gap-2 text-gray-600 items-center ">
      <Link href={"/"}>
          <p className="cursor-pointer">Movies</p>
      </Link>
        </div>
    </div>
  );
}
