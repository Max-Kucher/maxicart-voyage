import {ReactNode} from 'react';
import AppContextWrapper from "@/components/AppContext";
import { Metadata } from 'next';
import {getCookie, setCookie} from "cookies-next";
import appConfig from "@/config/app";

type Props = {
    children: ReactNode;
};

export const metadata: Metadata = {
    title: 'EVA Holiday Homes',
    icons: {
        icon: '/favicon.ico',
    }
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({children}: Props) {
    if (!getCookie('currency')) {
        setCookie('currency', appConfig.defaultCurrency)
    }

    return (<AppContextWrapper>
        {children}
    </AppContextWrapper>);
}
