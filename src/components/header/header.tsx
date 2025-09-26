import Image from "next/image";
import Link from "next/link";
import SearchBar from "./searchbar";
import UserProfile from "./userProfile";
import { Button } from "../ui/button";
import SignIn from "./clerkSignIn";

export default function HeaderComponent() {
  return (
    <header>
      <div className="w-full h-18 flex items-center px-32 justify-between bg-[#EBEBEB]">
        <div className="h-full w-max flex items-center gap-4">
          <div className="h-full flex items-center overflow-hidden w-40">
            <Link href={"/"}>
              <Image
                src={"/showLogo.png"}
                alt="Logo"
                height={150}
                width={150}
              />
            </Link>
          </div>
          <div className="h-full w-max flex items-center ">
            <SearchBar />
          </div>
        </div>
        {true ? (
          <SignIn />
        ) : (
          <div>
            <UserProfile />
          </div>
        )}
      </div>
    </header>
  );
}
