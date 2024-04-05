import { Link } from "@/navigation";
import appConfig from "@/config/app";

export default function LanguageSwitcher() {
    return (
        <div className={"flex"}>
            {Object.entries(appConfig.supportedLanguages).map(([ lang ]) => (
                <Link key={`lang-switcher-item-${lang}`}
                      href={`/`}
                      locale={lang as "ru" | "en"}
                      className={`uppercase text-[20px] leading-[24px] font-semibold p-[10px] rounded-[5px]`}
                >
                    { lang }
                </Link>
            ))}
        </div>
    )
}
