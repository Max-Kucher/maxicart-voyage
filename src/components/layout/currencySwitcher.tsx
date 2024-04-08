
import Image from "next/image";
import {useTranslations} from 'next-intl';

interface CurrencySwitcherProps {
    className?: string;
}

export default function CurrencySwitcher({ className, ...props }: CurrencySwitcherProps) {
    const t = useTranslations('images');

    return (
        <div className={`flex items-center ${className}`} {...props}>
            <span className={"block font-semibold text-black mr-2 text-[20px]"}>USD</span>
            <Image
                src={"/images/flags/us.svg"}
                width={44}
                height={44}
                alt={t("us-flag")}
            />
        </div>
    );
};
