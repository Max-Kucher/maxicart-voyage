'use client'

import Image from "next/image";
import {setCookie, getCookie} from "cookies-next";
import appConfig from "@/config/app";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import Currency from "@/types/Currency";
import { useRouter } from "next/navigation";

interface CurrencySwitcherProps {
    className?: string;
    currenciesList?: Currency[];
}

export default function CurrencySwitcher({className, currenciesList}: CurrencySwitcherProps) {
    const router = useRouter();
    return (
        <div className={'inline-block'}>
            <Select onValueChange={(value) =>  {
                setCookie('currency', value);
                router.refresh()
            }} defaultValue={getCookie('currency') ?? appConfig.defaultCurrency}>
                <SelectTrigger className="max-w-[70px] min-w-[100px] md:max-w-[100px] !bg-transparent p-0 [&>svg]:hidden border-0 focus:ring-0 focus:ring-transparent ring-offset-transparent">
                    <SelectValue placeholder="Currency"/>
                </SelectTrigger>
                <SelectContent>
                    {currenciesList && currenciesList.map((currency: Currency) => (
                        <SelectItem key={`currency-switcher-${currency.id}`} className={'[&>.check]:hidden !outline-0'} value={currency.code}>
                            <div className={'flex w-full items-center justify-between'}>
                            <span
                                className={"block font-semibold text-black mr-2 md:text-[20px] text-base cursor-default"}>{currency.code}</span>

                                <Image
                                    className={'w-[25px] md:w-[44px]'}
                                    src={currency.icon}
                                    width={44}
                                    height={44}
                                    alt={currency.code}
                                />
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
