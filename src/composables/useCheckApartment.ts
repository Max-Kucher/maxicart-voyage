import {useLocale} from "next-intl";
import ApartmentsSearchParams from "@/types/ApartmentsSearchParams";
import appConfig from "@/config/app";
import {getCookie} from "cookies-next";

export default function useCheckApartments() {
    const locale: string = useLocale();


    const checkApartment = async (apartmentId: number, apartmentSearch: ApartmentsSearchParams) => {
        const url = new URL(`/api/smoobu/apartments/check/${apartmentId}`, appConfig.backendBase);

        if (apartmentSearch?.arrival_date) {
            url.searchParams.append('arrival_date', apartmentSearch?.arrival_date);
        }

        if (apartmentSearch?.departure_date) {
            url.searchParams.append('departure_date', apartmentSearch?.departure_date);
        }

        // if (apartmentSearch?.guests) {
        //     url.searchParams.append('guests', apartmentSearch?.guests);
        // }

        const response = await fetch(url.toString(), {
            cache: "no-store",
            headers: {
                'Accept-Language': locale,
                'X-VOYAGE-CURRENCY': getCookie('currency') ?? appConfig.defaultCurrency,
            },
        });

        return {
            ok: response.ok,
            status: response.status,
            body: await response.json(),
            headers: response.headers
        };
    }

    return {
        checkApartment,
    };
}

