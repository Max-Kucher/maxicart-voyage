import ApartmentsSearchDatesRange from "@/types/ApartmentsSearchDatesRange";

export default interface ApartmentsSearchParams extends ApartmentsSearchDatesRange
{
    page?: number;
    items_per_page?: number | null;
    total?: number;
    total_pages?: number;
    min_price?: number;
    max_price?: number;
    rooms?: number;
    guests?: number;
    sort_by?: string;
    sort_order?: 'desc' | 'asc';
    adults?: number;
    child?: number;
    best_offer?: "True" | "False"; // some python stuff
}
