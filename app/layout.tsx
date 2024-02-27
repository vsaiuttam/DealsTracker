import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

//Default code from Next.js
const inter = Inter({ subsets: ["latin"] });
const spaceGrostesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Deals Tracker",
  description:
    "Track your favorite items and get notified when they go on sale.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className=" mx-auto">
          <Navbar />
          {children}
        </main>
          
      </body>
    </html>
  );
}
