import Logo from "@/components/layout/logo";
import DesktopMenu from "@/components/layout/desktopMenu";
import LanguageSwitcher from "@/components/layout/languageSwitcher";


export default function Header() {
    return (<header className="pt-[70px] pb-[40px] bg-white">
    <div className="container flex items-center">
        <Logo/>

        <DesktopMenu/>

        <LanguageSwitcher/>
    </div>
</header>);
};
