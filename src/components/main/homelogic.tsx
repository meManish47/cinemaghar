"use client";
import { useUser } from "@clerk/nextjs";
import HomePage from "../homepage/homepage";
import AdminDashboard from "@/app/admin/page";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeLogic({ q }: { q: string }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const adminEmail = "kmanish57610@gmail.com";
  const currentEmail = user?.primaryEmailAddress?.emailAddress;
  const router = useRouter();
  useEffect(() => {
    if (q === "auth_error") {
      toast.error("Please Sign In first!");
      router.push("/");
    }
  }, [q]);
  if (!isLoaded)
    return (
      <p className="h-screen w-full flex items-center justify-center ">
        <span className="loading loading-spinner loading-xl"></span>
      </p>
    );
  if (!isSignedIn) return <HomePage />;
  if (currentEmail !== adminEmail) return <HomePage />;
  return <AdminDashboard />;
}
