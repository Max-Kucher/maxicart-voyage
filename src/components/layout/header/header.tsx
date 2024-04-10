'use client';
import Logo from "@/components/layout/logo";
import DesktopMenu from "@/components/layout/header/desktopMenu";
import LanguageSwitcher from "@/components/layout/languageSwitcher";
import CurrencySwitcher from "@/components/layout/currencySwitcher";
import PhoneLink from "@/components/layout/header/phoneLink";
import MobileMenu from "@/components/layout/header/mobileMenu";
import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import React from "react";
import {useSearchParams} from "next/navigation";
import {useRouter} from "@/navigation";
import AddApartmentForm from "@/src/components/AddApartmentForm";


export default function Header() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const isRentOut = searchParams.get('rentOut');
    const isSuccess = searchParams.get('success');

    return (<header className="2xl:pt-[70px] 2xl:pb-[44px] md:pt-[66px] md:pb-[41px] pt-[31px] pb-[29px] bg-white">
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
                <DialogContent className={'xl:pt-[80px] xl:pb-[70px] xl:px-[150px] md:max-w-[800px] max-w-10/12'}>
                    <DialogHeader>
                        <b className={'text-center text-xl text-foreground'}>
                            Оставьте заявку и наши специалисты свяжутся с вами в близлежащее время
                        </b>
                    </DialogHeader>
                    <AddApartmentForm/>
                </DialogContent>
            </Dialog>
        </div>
    </header>);
};
