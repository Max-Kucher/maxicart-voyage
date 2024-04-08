import { Link } from "@/navigation";
import menuConfig from "@/config/menu";
import {useTranslations} from 'next-intl';
import Logo from "@/components/layout/logo";

export default function DesktopMenu() {
    const t = useTranslations('menu');

    return (
        <nav className={"hidden 2xl:block"}>
            <ul className={`flex gap-x-9`}>
                {menuConfig.items.map((item, index) => {
                    // if (item.showInHeader === false) {
                    //     return '';
                    // }

                    return (<li key={`desktop-menu-${index}`}>
                        <Link
                            className={`transition duration-150 ease-in hover:text-primary font-semibold text-[18px] text-highlightedText p-[4px]`}
                            href={item.href}
                        >
                            { t(item.title) }
                        </Link>
                    </li>
                )})}
            </ul>
        </nav>
    )
};

