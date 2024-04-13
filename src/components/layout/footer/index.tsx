import Logo from "@/components/layout/logo";
import LanguageSwitcher from "@/components/layout/languageSwitcher";
import CurrencySwitcher from "@/components/layout/currencySwitcher";
import { useTranslations, useLocale } from 'next-intl';
import { Link } from "@/navigation";
import menuConfig from "@/config/menu";
import appConfig from "@/config/app";
import MailIcon from "@/components/icons/mail";
import PhoneIcon from "@/components/icons/phone";
import { MapPinIcon, InstagramIcon } from "lucide-react";
import WhatsappIcon from "@/components/icons/whatsapp";

export default function Footer() {
    // @ts-ignore
    const locale: keyof typeof appConfig.contacts.instagram = useLocale();

    const t = useTranslations();
    const textBlockClass = `md:col-span-1 col-span-full xl:px-[20px] text-[20px] font-semibold`;

    return (<footer className={"bg-background"}>
        <div className="container grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] md:pt-[64px] pt-[35px] pb-[51px]">

            <div className={`col-span-2 xl:col-span-1 order-1 xl:order-[0] flex items-baseline justify-between xl:block mt-[40px] md:mt-0`}>
                <Logo width={219} height={74}/>

                <div className={"flex gap-x-[27px] xl:mt-[55px] relative -top-[15px] xl:top-0"}>
                    <LanguageSwitcher className={`flex gap-1`}/>

                    <CurrencySwitcher className={`hidden md:flex`} />
                </div>
            </div>

            <div className={`${textBlockClass} text-center md:text-left`}>
                <div className={`text-primary mb-[10px]`}>{t("common.company")}</div>

                <nav>
                    <ul role={`navigation`}>
                        {menuConfig.items.map(item => {
                            if (item.showInFooter !== undefined && item.showInFooter === false) {
                                return '';
                            }

                            return (
                            <li key={`footer-menu-${item.title}`} role={`presentation`}>
                                <Link className={`inline-block py-[10px] transition duration-150 ease-in hover:text-primary`} href={item.href}>
                                    {t(`menu.${item.title}`)}
                                </Link>
                            </li>
                        )})}
                    </ul>
                </nav>
            </div>

            <div className={textBlockClass}>
                <div className={`text-primary mb-[10px] text-center md:text-left`}>{t("menu.contacts")}</div>

                <a className={`flex relative pl-[33px] py-[10px]`} href={`mailto:${appConfig.contacts.email.display}`}>
                    <MailIcon className={"w-[22px] absolute left-0 top-[50%] -translate-y-1/2 fill-primary"} />
                    {appConfig.contacts.email.display}
                </a>

                <a className={`flex relative pl-[33px] py-[10px]`} href={`tel:${appConfig.contacts.phone.href}`}>
                    <PhoneIcon className={"w-[22px] absolute left-0 top-[50%] -translate-y-1/2 fill-primary"} />
                    {appConfig.contacts.phone.display}
                </a>

                <div className={`flex relative pl-[33px] py-[10px]`} >
                    <MapPinIcon className={`h-[22px] absolute left-0 top-0 mt-[14px] text-primary`} />
                    {t(appConfig.contacts.location.display)}
                </div>

                <div className={`flex gap-[33px] xl:mt-[19px] md:mt-[16px] mt-[14px] px-1 justify-center md:justify-normal`}>
                    <a href={appConfig.contacts.whatsapp.href} target={"_blank"}>
                        <WhatsappIcon className={`fill-primary w-[37.31px]`} />
                    </a>

                    <a href={appConfig.contacts.instagram[locale].href} target={"_blank"}>
                        <InstagramIcon width={37} height={37} className={`text-primary text-[45px]`} />
                    </a>
                </div>
            </div>
        </div>
    </footer>);
}
