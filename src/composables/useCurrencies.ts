import appConfig from "@/config/app";
import { useLocale } from "next-intl";
import GetCurrenciesListRequestResult from "@/types/GetCurrenciesListRequestResult";

export default function useCurrencies() {
    const locale: string = useLocale();

    const getList = async (): Promise<GetCurrenciesListRequestResult> => {
        const url = new URL('/api/payment/currencies/', appConfig.backendBase);

        const response = await fetch(url.toString(), {
            headers: {
                "Accept-Language": locale,
            }
        });

        return {
            ok: response?.ok ?? false,
            status: response?.status ?? 400,
            body: await response.json() ?? [],
            headers: response?.headers ?? {},
        };
    };

    return { getList };
}

