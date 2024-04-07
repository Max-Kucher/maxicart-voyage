import appConfig from "@/config/app";
import Apartment from "@/types/Apartment";

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
    const searchApartments = async (params: Record<string, string | number> = {}): Promise<Apartment[]> => {
        let apartments: [] = [];

        try {
            apartments = await fetchApartments(params);
        } catch (error) {
            console.log(error);
        }

        return apartments;
    };

    return { searchApartments };
}

