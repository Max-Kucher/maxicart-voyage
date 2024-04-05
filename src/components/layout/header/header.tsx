import Logo from "@/components/layout/logo";
import DesktopMenu from "@/components/layout/header/desktopMenu";
import LanguageSwitcher from "@/components/layout/languageSwitcher";
import CurrencySwitcher from "@/components/layout/currencySwitcher";
import PhoneLink from "@/components/layout/header/phoneLink";


export default function Header() {
    return (<header className="pt-[70px] pb-[40px] bg-white">
    <div className="container flex items-center justify-between">
        <Logo/>

        <DesktopMenu/>

        <LanguageSwitcher/>

        <CurrencySwitcher />

        <PhoneLink />
    </div>
</header>);
};
