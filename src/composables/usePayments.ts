import appConfig from "@/config/app";
import CreatePaymentData from "@/types/CreatePaymentData";

export default function usePayments() {
    const createPayment = async (paymentData: CreatePaymentData): Promise<{ ok: boolean, status: number, body?: {}, headers: {} }> => {
        const url = new URL('/api/payment/create/', appConfig.backendBase);

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
        });

        return {
            ok: response?.ok ?? false,
            status: response?.status ?? 400,
            body: await response.json() ?? {},
            headers: response?.headers ?? {},
        };
    };

    return { createPayment };
}

