
export default interface Currency
{
    id: number;
    "code": string;
    "symbol": string;
    "decimal_places": number;
    "rate": string; // decimal string
    "icon": string;
}
