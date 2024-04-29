import appConfig from "@/config/app";
import { useLocale } from "next-intl";
import CheckoutFormData from "@/types/checkout/CheckoutFormData";
import CreateOrderResponseBody from "@/types/checkout/CreateOrderResponseBody";
import {getCookie} from "cookies-next";

export default function useOrders() {
    const locale: string = useLocale();

    const createOrder = async (checkoutFormData: CheckoutFormData & { stripeClientSecret?: string })
        : Promise<{ ok: boolean, status: number, body: CreateOrderResponseBody, headers: {} }> =>
    {
        const url = new URL('/api/payment/order/', appConfig.backendBase);

        const requestBody: {} = {
            first_name: checkoutFormData.name,
            last_name: checkoutFormData.lastname,
            phone: checkoutFormData.phone,
            email: checkoutFormData.email,
            payment_method: checkoutFormData.payment.toUpperCase(),
            is_another_person: checkoutFormData.guest === "another",
            stripe_client_secret: checkoutFormData?.stripeClientSecret ?? '',
        };

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": locale,
                "X-VOYAGE-CURRENCY": getCookie('currency') ?? appConfig.defaultCurrency,
            },
            body: JSON.stringify(requestBody),
        });

        return {
            ok: response?.ok ?? false,
            status: response?.status ?? 400,
            body: await response.json() ?? {},
            headers: response?.headers ?? {},
        };
    };

    return { createOrder };
}

