import appConfig from "@/config/app";
import ApartmentsSearchResult from "@/types/ApartmentsSearchResult";
import ApartmentsSearchParams from "@/types/ApartmentsSearchParams";

async function fetchApartments(params?: ApartmentsSearchParams)
{
    const url = new URL('/api/smoobu/apartments/', appConfig.backendBase);

    if (params !== undefined) {
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

    return { searchApartments };
}

