import Currency from "@/types/Currency";


export default interface GetCurrenciesListRequestResult
{
    ok?: boolean;
    status?: number;
    body?: Currency[];
    headers?: {};
}
