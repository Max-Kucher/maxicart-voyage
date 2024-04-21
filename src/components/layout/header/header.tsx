'use client';

import Logo from "@/components/layout/logo";
import DesktopMenu from "@/components/layout/header/desktopMenu";
import LanguageSwitcher from "@/components/layout/languageSwitcher";
import CurrencySwitcher from "@/components/layout/currencySwitcher";
import PhoneLink from "@/components/layout/header/phoneLink";
import MobileMenu from "@/components/layout/header/mobileMenu";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import React from "react";
import {useSearchParams} from "next/navigation";
import {useRouter} from "@/navigation";
import AddApartmentForm from "@/src/components/AddApartmentForm";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Header() {
    const t = useTranslations();
    const router = useRouter()
    const searchParams = useSearchParams()
    const isRentOut = searchParams.get('rentOut');
    const isSuccess = searchParams.get('success');

    return (<header className="2xl:py-[35px] md:pt-[66px] md:pb-[41px] pt-[31px] pb-[29px] bg-white">
        <div className="container flex items-center 2xl:justify-between">
            <Logo width={167} height={57} className={`maxicart-header-logo block mr-auto 2xl:mr-16`}/>

            <DesktopMenu/>

            <LanguageSwitcher className={"mr-8 2xl:mr-0 hidden md:flex"}/>

            <CurrencySwitcher className={"hidden md:flex"}/>

            <PhoneLink className={"text-primary text-[20px] font-semibold hidden 2xl:block"}/>

            <MobileMenu/>
            <Dialog
                onOpenChange={(open) => {
                    if (!open) {
                        router.replace('/')
                    }
                }}
                open={!!isRentOut}>
                <DialogContent className={'xl:pt-[80px] xl:pb-[70px] xl:px-[150px] md:max-w-[800px] max-w-[90vw] rounded-xl'}>
                    <DialogHeader>
                        <b className={'text-center text-xl text-foreground'}>
                            {t('popupForm.title')}
                        </b>
                    </DialogHeader>
                    <AddApartmentForm/>
                </DialogContent>
            </Dialog>
            <Dialog
                onOpenChange={(open) => {
                    if (!open) {
                        router.replace('/')
                    }
                }}
                open={!!isSuccess}>
                <DialogContent className={'md:max-w-[400px] max-w-[90vw] md:pt-[120px] md:px-[45px] md:pb-[90px] py-[40px] rounded-xl'}>
                    <DialogHeader>
                        <Image className={'max-h-[124px] max-w-[124px] mx-auto'} src={'/images/success.svg'} width={124} height={124} alt={""} />
                    </DialogHeader>
                   <div className={'text-center mt-[51px]'}>
                       <DialogTitle className={'font-semibold text-xl text-black'}>{t('successPupup.title')}</DialogTitle>
                       <DialogDescription className={'mt-[31px] font-medium text-lg'}>
                           {t('successPupup.description')}
                       </DialogDescription>
                   </div>
                </DialogContent>
            </Dialog>
        </div>
    </header>);
};
