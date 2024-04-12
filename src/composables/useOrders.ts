import appConfig from "@/config/app";
import CreatePaymentData from "@/types/CreatePaymentData";
import CreatePaymentRequestResult from "@/types/CreatePaymentRequestResult";
import CheckoutFormData from "@/types/checkout/CheckoutFormData";

export default function useOrders() {
    const createOrder = async (checkoutFormData: CheckoutFormData & { stripeClientSecret?: string })
        : Promise<{ ok: boolean, status: number, body: {}, headers: {} }> =>
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

