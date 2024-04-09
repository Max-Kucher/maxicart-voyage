
import Apartment from "@/types/Apartment";

export default class ApartmentsSearch {
    data: Apartment[] = [];
    search: {
        page: number;
        items_per_page: number;
        total: number;
        total_pages: number;
        arrival_date: string | null;
        departure_date: string | null;
        min_price: number | null;
        max_price: number | null;
        rooms: number | null;
        guests: number | null;
        sort_by: string;
        sort_order: string;
    };

    constructor() {
        this.search = {
            page: 0,
            items_per_page: 0,
            total: 0,
            total_pages: 0,
            arrival_date: null,
            departure_date: null,
            min_price: null,
            max_price: null,
            rooms: null,
            guests: null,
            sort_by: '',
            sort_order: ''
        };
    }
};
