import Location from "@/types/Location";
import RoomsData from "@/types/RoomsData";
import Photo from "@/types/Photo";
import Amenity from "@/types/Amenity";
import Equipments from "@/types/Equipments";
import ApartmentAddon from "@/types/ApartmentAddon";

export default interface Apartment
{
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
    title?: string,
    description?: string,
    m2: number|null,
    photos: Photo[];
    amenities: Amenity[];
    equipments: {
        [key: string]: string[]
    },
    addons: ApartmentAddon[],
    smoobu_price: {
        price: number;
    };
    document: string;
    address: string; // Full address string from backend
    nights?: number;
};
