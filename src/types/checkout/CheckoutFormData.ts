

export default interface CheckoutFormData
{
    name: string;
    lastname: string;
    email: string;
    phone: string;
    guest: "me" | "another" | string;
    payment: "cash" | "card" | string;
}
