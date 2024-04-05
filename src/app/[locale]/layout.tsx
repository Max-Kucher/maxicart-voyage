// import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import Image from "next/image";
import DesktopMenu from "@/components/layout/desktopMenu";
import LanguageSwitcher from "@/components/layout/languageSwitcher";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function LocaleLayout({
     children,
     params: {locale}
 }: {
    children: React.ReactNode;
    params: {locale: string};
}) {
    return (
        <html lang={locale}>
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

                <DesktopMenu/>

                <LanguageSwitcher/>
            </div>
        </header>

        {children}

        </body>
        </html>
    );
}
