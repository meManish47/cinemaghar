"use client";

import { gqlClient } from "@/services/gql";
import { useAuth } from "@clerk/nextjs";
import { gql } from "graphql-request";
import { useEffect } from "react";

export default function LogoutCleanup() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn === false) {
      gqlClient.request(gql`
        mutation Logout {
          logoutUser
        }
      `);
    }
  }, [isSignedIn]);

  return null;
}