
export default interface ApartmentsSearchParams
{
    page?: number;
    items_per_page?: number;
    total?: number;
    total_pages?: number;
    arrival_date?: string;
    departure_date?: string;
    min_price?: number;
    max_price?: number;
    rooms?: number;
    guests?: number;
    sort_by?: string;
    sort_order?: string;
}
