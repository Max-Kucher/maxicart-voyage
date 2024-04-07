import Location from "@/types/Location";
import RoomsData from "@/types/RoomsData";
import Photo from "@/types/Photo";

export default interface Apartment {
    id: number;
    smoobu: {
        id: number;
        name: string;
        currency: string;
        price: {
            minimal: number;
            maximal: number;
        };
        location: Location;
        timeZone: string;
        rooms: RoomsData;
    };
    photos: Photo[];
    smoobu_price: {
        price: number;
    };
};
