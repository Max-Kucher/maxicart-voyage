import { Link } from "@/navigation";
import appConfig from "@/config/app";
import {useLocale} from "next-intl";

export default function LanguageSwitcher({ ...props }) {
    const locale = useLocale();

    return (
        <div {...props}>
            {Object.entries(appConfig.supportedLanguages).map(([ lang ]) => (
                <Link key={`lang-switcher-item-${lang}`}
                      href={`/`}
                      locale={lang as "ru" | "en"}
                      className={"uppercase inline-block text-[20px] leading-[24px] font-semibold p-[10px] rounded-[5px]"
                                    + (locale === lang ? ' bg-primary text-primary-foreground hover:bg-primary/90 maxicart-language-switcher-active' : ' bg-white text-highlightedText')}
                >
                    { lang }
                </Link>
            ))}
        </div>
    )
}
