import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import HeaderComponent from "@/components/header/header";
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
      <html lang="en">
        <body className="bg-[#EBEBEB]">
          <HeaderComponent />
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
