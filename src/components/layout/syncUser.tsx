"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SyncUser() {
  const { isLoaded, isSignedIn, user } = useUser();
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const syncUser = async () => {
      await fetch("/api/sync-user", {
        method: "POST",
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        }),
      });
    };
    // console.log("CUTRENT USER",user)
    syncUser();
  }, [isLoaded, isSignedIn, user]);

  return null;
}
