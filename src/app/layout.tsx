import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="bg-[#EBEBEB]">
        {children}
      </body>
    </html>
  );
}
