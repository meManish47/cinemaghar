import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function SignIn() {
  return (
    <main className="flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        {/* Sign In Modal */}
        <SignInButton mode="modal">
          <Button className="font-normal border-red-500 bg-[#E7364D] hover:bg-[#e82640]   text-sm sm:text-base h-8 sm:h-8 px-2 sm:px-4 cursor-pointer text-white ">
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </main>
  );
}
