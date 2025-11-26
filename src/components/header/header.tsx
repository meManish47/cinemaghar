import Image from "next/image";
import Link from "next/link";
import SignIn from "./clerkSignIn";
import SearchBar from "./searchbar";
import { currentUser } from "@clerk/nextjs/server";

export default async function HeaderComponent() {
  const User = await currentUser();
  return (
    <header>
      <div className="w-full h-18 flex items-center px-2 sm:px-32 justify-between bg-[#FFFFFF]">
        <div className="h-full w-full flex items-center gap-4 justify-between sm:justify-start  ">
          <div className="h-full flex items-center overflow-hidden w-24 sm:w-40">
            <Link href={"/"}>
              <Image
                src={"/showLogo.png"}
                alt="Logo"
                height={150}
                width={150}
              />
            </Link>
          </div>
          <div className="h-4 sm:h-full w-max flex items-center ">
            {User?.emailAddresses[0].emailAddress !=
              "kmanish57610@gmail.com" && <SearchBar />}
          </div>
        </div>
        <SignIn />
      </div>
    </header>
  );
}
