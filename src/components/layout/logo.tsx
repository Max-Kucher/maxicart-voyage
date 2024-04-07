import { Link } from "@/navigation";
import Image from "next/image";
import {useTranslations} from 'next-intl';


export default function Logo({ width, height, ...props }: { width: number, height: number, [key: string]: any }) {
    const t = useTranslations('images');

    return (
        <Link { ...props } href="/">
            <Image
                alt={t("logo")}
                width={width}
                height={height}
                src="/images/voyage-logo.svg"
            />
        </Link>
    );
};
