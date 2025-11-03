"use client";
import AdminDashboard from "@/app/admin/page";
import { useUser } from "@clerk/nextjs";
import HomePage from "../homepage/homepage";

export default function HomeLogic() {
  const { user, isSignedIn, isLoaded } = useUser();
  const adminEmail = "kmanish57610@gmail.com";
  const currentEmail = user?.primaryEmailAddress?.emailAddress;

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
