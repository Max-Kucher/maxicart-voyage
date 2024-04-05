import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import DesktopMenu from "@/components/layout/desktopMenu";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
      <header className="pt-[70px] pb-[40px] bg-white">
          <div className="container mx-auto">
              <Link href="/">
                  <Image
                      alt="Voyage Logo"
                      width={169}
                      height={57}
                      src="/voyage-logo.svg"
                  />
              </Link>

              <DesktopMenu />
          </div>
      </header>

      {children}

      </body>
    </html>
  );
}
