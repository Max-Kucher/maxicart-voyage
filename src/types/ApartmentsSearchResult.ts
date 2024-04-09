
import Apartment from "@/types/Apartment";
import ApartmentsSearchParams from "@/types/ApartmentsSearchParams";

export default class ApartmentsSearchResult {
    data: Apartment[] = [];
    search: ApartmentsSearchParams;

    constructor() {
        this.search = {};
    }
};
