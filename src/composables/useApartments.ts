import appConfig from "@/config/app";
import ApartmentsSearch from "@/types/ApartmentsSearch";

async function fetchApartments(params: Record<string, string | number>)
{
    const url = new URL('/api/smoobu/apartments/', appConfig.backendBase);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, String(value)));

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error('Failed to fetch Apartments');
    }

    return await response.json();
}

export default function useApartments() {
    const searchApartments = async (params: Record<string, string | number> = {}): Promise<ApartmentsSearch> => {
        let apartmentsSearch: ApartmentsSearch = new ApartmentsSearch();

        try {
            apartmentsSearch = await fetchApartments(params);
        } catch (error) {
            console.log(error);
        }

        return apartmentsSearch;
    };

    return { searchApartments };
}

