import { Link } from "@/navigation";
import appConfig from "@/config/app";
import {useLocale} from "next-intl";

export default function LanguageSwitcher() {
    const locale = useLocale();

    return (
        <div className={"flex"}>
            {Object.entries(appConfig.supportedLanguages).map(([ lang ]) => (
                <Link key={`lang-switcher-item-${lang}`}
                      href={`/`}
                      locale={lang as "ru" | "en"}
                      className={"uppercase text-[20px] leading-[24px] font-semibold p-[10px] rounded-[5px]"
                                    + (locale === lang ? ' !shadow-none bg-primary text-primary-foreground hover:bg-primary/90 maxicart-language-switcher-active' : ' text-highlightedText')}
                >
                    { lang }
                </Link>
            ))}
        </div>
    )
}
