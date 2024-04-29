'use client'
import Image from "next/image";
import {setCookie, getCookie} from "cookies-next";
import {useTranslations} from 'next-intl';
import appConfig from "@/config/app";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";

interface CurrencySwitcherProps {
    className?: string;
}

export default function CurrencySwitcher({className, ...props}: CurrencySwitcherProps) {
    const t = useTranslations('images');
    return (
        <div className={'inline-block'}>
            <Select onValueChange={(value) =>  setCookie('currency', value)} defaultValue={getCookie('currency') ?? appConfig.defaultCurrency}>
                <SelectTrigger className="max-w-[70px] md:max-w-[100px] !bg-transparent p-0 [&>svg]:hidden border-0 focus:ring-0 focus:ring-transparent ring-offset-transparent">
                    <SelectValue placeholder="Currency"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem className={'[&>.check]:hidden !outline-0'} value="AED">
                        <div className={'flex w-full items-center justify-between'}>
                            <span
                                className={"block font-semibold text-black mr-2 md:text-[20px] text-base cursor-default"}>AED</span>

                            <Image
                                className={'w-[25px] md:w-auto'}
                                src={"/images/flags/ae.svg"}
                                width={44}
                                height={44}
                                alt={t("us-flag")}
                            />
                        </div>
                    </SelectItem>
                    <SelectItem className={'[&>.check]:hidden'} value="USD">
                        <div className={'flex w-full items-center justify-between'}>
                            <span
                                className={"block font-semibold text-black mr-2  md:text-[20px] text-base cursor-default"}>USD</span>

                            <Image
                                className={'w-[25px] md:w-auto'}
                                src={"/images/flags/us.svg"}
                                width={44}
                                height={44}
                                alt={t("us-flag")}
                            />
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};
