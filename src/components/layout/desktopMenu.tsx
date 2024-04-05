import { Link } from "@/navigation";
import menuConfig from "@/config/menu";
import {useTranslations} from 'next-intl';

export default function DesktopMenu() {
    const t = useTranslations('menu');

    return (
        <nav>
            <ul>
                {menuConfig.items.map((item, index) => (
                    <li key={`desktop-menu-${index}`}>
                        <Link
                            className={``}
                            href={item.href}
                        >
                            { t(item.title) }
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

