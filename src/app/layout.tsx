import HeaderComponent from "@/components/header/header";
import LogoutCleanup from "@/components/layout/logoutclean";
import ScrollToTop from "@/components/layout/scrollToTop";
import SyncUser from "@/components/layout/syncUser";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import Footer from "@/components/layout/footer";
import NavBar from "@/components/header/navbar";

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
          <ScrollToTop />
          <HeaderComponent />
          <NavBar />
          <SyncUser />
          <LogoutCleanup />
          <Toaster richColors position="top-center" />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
