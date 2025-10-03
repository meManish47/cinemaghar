"use client";
import { SignedOut } from "@clerk/nextjs";
import { gqlClient } from "@/services/gql";
import { gql } from "graphql-request";

import { useEffect } from "react";

export default function LogoutCleanup() {
  useEffect(() => {
    const logout = async () => {
      await gqlClient.request(gql`
        mutation Logout {
          logoutUser
        }
      `);
    };
    logout();
  }, []);

  return <SignedOut />;
}
