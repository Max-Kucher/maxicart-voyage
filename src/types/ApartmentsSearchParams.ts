
interface IApartmentsSearchParams
{
    page: number | null;
    items_per_page: number | null;
    total: number | null;
    total_pages: number | null;
    arrival_date: string | null;
    departure_date: string | null;
    min_price: number | null;
    max_price: number | null;
    rooms: number | null;
    guests: number | null;
    sort_by: string | null;
    sort_order: string | null;
}

export default class ApartmentsSearchParams implements IApartmentsSearchParams
{
    page = 0;
    items_per_page = 0;
    total = 0;
    total_pages = 0;
    arrival_date = null;
    departure_date = null;
    min_price = null;
    max_price = null;
    rooms = null;
    guests = null;
    sort_by = '';
    sort_order = '';
}
