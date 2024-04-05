
import menuConfig from "@/config/menu";
import Link from "next/link";
import {useTranslations} from 'next-intl';

export default function DesktopMenu() {
    const t = useTranslations('menu');

    return (
        <nav>
            <ul>
                {menuConfig.items.map((item, index) => (
                    <li key={`desktop-menu-${index}`}>
                        <Link href={item.href}>{ t(item.title) }</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

