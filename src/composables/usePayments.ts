import appConfig from "@/config/app";
import CreatePaymentData from "@/types/CreatePaymentData";
import CreatePaymentRequestResult from "@/types/CreatePaymentRequestResult";
import { useLocale } from "next-intl";

export default function usePayments() {
    const locale: string = useLocale();

    const createPayment = async (paymentData: CreatePaymentData): Promise<CreatePaymentRequestResult> => {
        const url = new URL('/api/payment/create/', appConfig.backendBase);

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": locale,
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

