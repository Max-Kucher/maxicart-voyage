
import menuConfig from "@/config/menu";
import Link from "next/link";

export default function DesktopMenu() {
    return (
        <nav>
            <ul>
                {menuConfig.items.map((item, index) => (
                    <li key={`desktop-menu-${index}`}>
                        <Link href={item.href}>{ item.title }</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

