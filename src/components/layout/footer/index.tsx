import Logo from "@/components/layout/logo";
import LanguageSwitcher from "@/components/layout/languageSwitcher";
import CurrencySwitcher from "@/components/layout/currencySwitcher";
import {useTranslations} from 'next-intl';
import {Link} from "@/navigation";
import menuConfig from "@/config/menu";
import appConfig from "@/config/app";
import MailIcon from "@/components/icons/mail";
import PhoneIcon from "@/components/icons/phone";
import { MapPinIcon, InstagramIcon } from "lucide-react";
import WhatsappIcon from "@/components/icons/whatsapp";


export default function Footer() {
    const t = useTranslations();

    return (<footer className={"bg-background"}>
        <div className="container grid md:grid-cols-3 sm:grid-cols-2 gap-[30px] pt-[64px] pb-[51px]">
            <div>
                <Logo width={219} height={74}/>

                <div className={"flex gap-x-[27px] mt-[55px]"}>
                    <LanguageSwitcher className={`flex gap-1`}/>

                    <CurrencySwitcher/>
                </div>
            </div>
            <div className={`px-[20px] text-[20px] font-semibold`}>
                <div className={`text-primary mb-[10px]`}>{t("common.company")}</div>

                <nav>
                    <ul role={`navigation`}>
                        {menuConfig.items.map(item => {
                            if (item.showInFooter === false) {
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

            <div className={`px-[20px] text-[20px] font-semibold`}>
                <div className={`text-primary mb-[10px]`}>{t("menu.contacts")}</div>

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

                <div className={`flex gap-[33px] mt-[19px] px-1`}>
                    <a href={appConfig.contacts.whatsapp.href}>
                        <WhatsappIcon className={`fill-primary w-[37.31px]`} />
                    </a>

                    <a href={appConfig.contacts.instagram.href}>
                        <InstagramIcon width={37} height={37} className={`text-primary text-[45px]`} />
                    </a>
                </div>
            </div>
        </div>
    </footer>);
}
