// import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/layout/header/header";

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
            <Header />

            {children}

        </body>
        </html>
    );
}
