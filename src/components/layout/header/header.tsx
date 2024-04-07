import Logo from "@/components/layout/logo";
import DesktopMenu from "@/components/layout/header/desktopMenu";
import LanguageSwitcher from "@/components/layout/languageSwitcher";
import CurrencySwitcher from "@/components/layout/currencySwitcher";
import PhoneLink from "@/components/layout/header/phoneLink";
import MobileMenu from "@/components/layout/header/mobileMenu";


export default function Header() {
    return (<header className="2xl:pt-[70px] 2xl:pb-[44px] md:pt-[66px] md:pb-[41px] pt-[31px] pb-[29px] bg-white">
    <div className="container flex items-center 2xl:justify-between">
        <Logo width={167} height={57} className={`maxicart-header-logo block mr-auto 2xl:mr-16`} />

        <DesktopMenu/>

        <LanguageSwitcher className={"mr-8 2xl:mr-0 hidden md:flex"} />

        <CurrencySwitcher  className={"items-center hidden md:flex"} />

        <PhoneLink className={"text-primary text-[20px] font-semibold hidden 2xl:block"} />

        <MobileMenu />
    </div>
</header>);
};
