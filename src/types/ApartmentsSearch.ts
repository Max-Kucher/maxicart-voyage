
import Apartment from "@/types/Apartment";
import ApartmentsSearchParams from "@/types/ApartmentsSearchParams";

export default class ApartmentsSearch {
    data: Apartment[] = [];
    search: ApartmentsSearchParams;

    constructor() {
        this.search = new ApartmentsSearchParams();
    }
};
