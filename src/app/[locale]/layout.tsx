// import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/layout/header/header";
import {NextIntlClientProvider, useMessages} from "next-intl";
import Footer from "@/components/layout/footer";
import FindApartmentProvider from "@/context/FindApartmentProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function LocaleLayout({
     children,
     params: {locale}
 }: {
    children: React.ReactNode;
    params: {locale: string};
}) {
    const messages = useMessages();

    return (
        <html lang={locale}>
        <body className={montserrat.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>

            <Header />

            <FindApartmentProvider>
                {children}
            </FindApartmentProvider>

            <Footer />

        </NextIntlClientProvider>
        </body>
        </html>
    );
}
