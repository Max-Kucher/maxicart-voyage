
import Image from "next/image";
import {useTranslations} from 'next-intl';

export default function CurrencySwitcher({ ...props }) {
    const t = useTranslations('images');

    return (
        <div {...props}>
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
