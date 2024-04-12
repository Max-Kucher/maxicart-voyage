import appConfig from "@/config/app";
import ApartmentsSearchResult from "@/types/ApartmentsSearchResult";
import ApartmentsSearchParams from "@/types/ApartmentsSearchParams";
import Apartment from "@/types/Apartment";

async function fetchApartments(params?: ApartmentsSearchParams)
{
    const url = new URL('/api/smoobu/apartments/', appConfig.backendBase);

    if (params !== undefined) {
        if (params.min_price !== undefined) {
            params.min_price *= 100;
        }

        if (params.max_price !== undefined) {
            params.max_price *= 100;
        }

        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, String(value)));
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error('Failed to fetch Apartments');
    }

    return await response.json();
}

export default function useApartments() {
    const searchApartments = async (params?: ApartmentsSearchParams): Promise<ApartmentsSearchResult> => {
        let apartmentsSearch: ApartmentsSearchResult = new ApartmentsSearchResult();

        try {
            apartmentsSearch = await fetchApartments(params);
        } catch (error) {
            console.log(error);
        }

        return apartmentsSearch;
    };

    const searchApartmentById = async (apartmentId: number): Promise<{ ok: true, body: Apartment, headers: {} }> => {
        const url = new URL(`/api/smoobu/apartments/${apartmentId}`, appConfig.backendBase);

        const response = await fetch(url.toString(), {
            next: {
                tags: ['apartments', `apartments-${apartmentId}`],
            }
        });

        if (!response.ok) {
            throw new Error('Failed to find apartment');
        }

        return {
            ok: response.ok,
            body: await response.json(),
            headers: response.headers
        };
    }

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
        });

        return {
            ok: response.ok,
            status: response.status,
            body: await response.json(),
            headers: response.headers
        };
    }

    return {
        searchApartments,
        searchApartmentById,
        checkApartment,
    };
}

