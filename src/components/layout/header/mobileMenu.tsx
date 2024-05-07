"use client"

import { useState, useEffect  } from "react";
import MenuIcon from "@/components/icons/menu";
import {useTranslations} from 'next-intl';
import menuConfig from "@/config/menu";
import {Link, useRouter} from "@/navigation";
import CrossIcon from "@/components/icons/cross";
import PhoneLink from "@/components/layout/header/phoneLink";
import Logo from "@/components/layout/logo";
import LanguageSwitcher from "@/components/layout/languageSwitcher";
import CurrencySwitcher from "@/components/layout/currencySwitcher";
import Currency from "@/types/Currency";


export default function MobileMenu({currenciesList}: {currenciesList?: Currency[]}) {
    const t = useTranslations('menu');
    const router = useRouter();
    const [isOpen, setOpen] = useState(false);

    const linksClass = "text-[20px] font-semibold block text-center md:text-left md:pl-20 pb-4 pt-4";

    const [logoWidth, setLogoWidth] = useState(244);
    const [logoHeight, setLogoHeight] = useState(79);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 800) {
                setLogoWidth(145);
                setLogoHeight(47);
            } else {
                setLogoWidth(244);
                setLogoHeight(79);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const menuOpenerHandler = () => {
        setOpen(!isOpen);
    };

    return (<div className={"relative xl:hidden"}>
        <button className={"ml-10"} onClick={menuOpenerHandler}>
            <MenuIcon width={60} height={32} className={"w-[48px] h-[27px] sm:h-auto sm:w-auto transition duration-300 ease-out fill-foreground hover:fill-primary"} />
        </button>

        <div className={"flex z-10 flex-col md:justify-center pt-[100px] md:pt-0 bg-white fixed shadow-xl w-[100vw] top-0 right-0 bottom-0 min-h-dvh max-h-dvh overflow-y-auto xl:max-w-[562px] md:max-w-[399px] " + (isOpen ? 'block' : 'hidden')}>
            <button onClick={menuOpenerHandler} className={"absolute p-5 m-5 top-0 right-0"} >
                <CrossIcon className={"transition duration-150 ease-out fill-[#808080] hover:fill-primary"} width={30} height={30} />
            </button>

            <nav>
                <ul>
                    {menuConfig.items.map((item, index) => (
                        <li key={`mobile-menu-${index}`}>
                            <Link
                                className={`text-highlightedText ${linksClass}`}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault()
                                    router.push(item.href)
                                    setOpen(false)
                                }}
                            >
                                {t(item.title) }
                            </Link>
                        </li>
                    ))}

                    <li>
                        <PhoneLink className={`text-primary hover:opacity-70 ${linksClass}`} />
                    </li>
                </ul>
            </nav>

            <Logo width={logoWidth} height={logoHeight} className={"xl:mt-[100px] mt-[50px] md:pl-20 mx-auto md:mx-0"} />

            <div className={"flex md:hidden items-center justify-center gap-[27px] mt-[60px] mb-[30px]"}>
                <LanguageSwitcher />

                {currenciesList && <CurrencySwitcher currenciesList={currenciesList}/>}
            </div>
        </div>
    </div>
    );
};
