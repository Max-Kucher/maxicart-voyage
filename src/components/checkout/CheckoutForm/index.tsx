'use client'

import React from "react";
import Apartment from "@/types/Apartment";
import appConfig from "@/config/app";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Form from "@/components/checkout/CheckoutForm/Form";

const stripePromise = loadStripe(appConfig.stripe.publishableKey);

interface CheckoutFormProps {
    apartmentData: Apartment;
    availabilityData: {
        isAvailable: boolean,
        errorMessage: string,
    },
    stripeClientSecret: string,
    price: number
}

export default function CheckoutForm({ apartmentData, availabilityData, stripeClientSecret, price }: CheckoutFormProps) {

    const stripeOptions = {
        clientSecret: stripeClientSecret,
        appearance: appConfig.stripe.appearance,
    };

    return (
        <>
            {/* @ts-ignore */}
            <Elements stripe={stripePromise} options={stripeOptions}>
                <Form price={price} stripeClientSecret={stripeClientSecret} availabilityData={availabilityData} apartmentData={apartmentData} />
            </Elements>
        </>
    )
}
