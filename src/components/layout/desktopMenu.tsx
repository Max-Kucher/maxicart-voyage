import { Link } from "@/navigation";
import menuConfig from "@/config/menu";
import {useTranslations} from 'next-intl';

export default function DesktopMenu() {
    const t = useTranslations('menu');

    return (
        <nav>
            <ul className={`flex gap-x-9`}>
                {menuConfig.items.map((item, index) => (
                    <li key={`desktop-menu-${index}`}>
                        <Link
                            className={`font-semibold text-highlightedText p-[4px]`}
                            href={item.href}
                        >
                            { t(item.title) }
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
};

