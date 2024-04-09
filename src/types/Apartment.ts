import Location from "@/types/Location";
import RoomsData from "@/types/RoomsData";
import Photo from "@/types/Photo";

export default interface Apartment {
    id: number;
    smoobu: {
        id: number;
        name: string;
        location: Location;
        timeZone: string;
        rooms: RoomsData;
        currency: string;
        price: {
            minimal: number;
            maximal: number;
        };
        type: {
            id: number;
            name: string;
        };
    };
    m2: number|null,
    photos: Photo[];
    amenities: {
        id: number;
        title: string;
        icon: string;
    }[];
    equipments: {
        Bathroom: string[];
        Kitchen: string[];
        Bedroom: string[];
    },
    smoobu_price: {
        price: number;
    };
    address: string; // Full address string from backend
};
