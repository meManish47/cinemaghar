import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import HeaderComponent from "@/components/header/header";
import NavBar from "@/components/header/navbar";
import SyncUser from "@/components/layout/syncUser";
import LogoutCleanup from "@/components/layout/logoutclean";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Show Time",
  description: "A movie ticket booking platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="bg-[#FFFFFF]" suppressHydrationWarning>
          <HeaderComponent />
          
          <SyncUser />
          <LogoutCleanup />
          <Toaster richColors position="top-center"/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
