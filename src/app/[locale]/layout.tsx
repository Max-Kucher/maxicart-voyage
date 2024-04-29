import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/layout/header/header";
import {NextIntlClientProvider, useMessages} from "next-intl";
import Footer from "@/components/layout/footer";

const montserrat = Montserrat({ subsets: ["latin"] });

import useCurrencies from "@/composables/useCurrencies";

const RenderHeader = async () => {
    const { getList } = useCurrencies();
    const currencyListResult = await getList();

    return (
        <Header currenciesList={currencyListResult?.body} />
    );
};

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

            <RenderHeader />

            {/*<FindApartmentProvider>*/}
                {children}
            {/*</FindApartmentProvider>*/}

            <Footer id={"app-footer"} />

        </NextIntlClientProvider>
        </body>
        </html>
    );
}
