

export default interface CreatePaymentRequestResult
{
    ok?: boolean;
    status?: number;
    body?: {
        client_secret?: string;
    };
    headers?: {};
}
