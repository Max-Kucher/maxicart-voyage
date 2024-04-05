// import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import DesktopMenu from "@/components/layout/desktopMenu";
import LanguageSwitcher from "@/components/layout/languageSwitcher";
import Logo from "@/components/layout/logo";

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
                <Logo />

                <DesktopMenu/>

                <LanguageSwitcher/>
            </div>
        </header>

        {children}

        </body>
        </html>
    );
}
