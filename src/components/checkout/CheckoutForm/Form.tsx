'use client'

import React, { useState } from "react";
import {useTranslations} from "next-intl";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import Apartment from "@/types/Apartment";
import appConfig from "@/config/app";
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import useOrders from "@/composables/useOrders";
import {Button} from "@/components/ui/button";
import CheckoutFormData from "@/types/checkout/CheckoutFormData";
import {useRouter} from "@/navigation";

const stripePromise = loadStripe(appConfig.stripe.publishableKey);

interface CheckoutFormProps {
    apartmentData: Apartment;
    availabilityData: {
        isAvailable: boolean,
        errorMessage: string,
    },
    stripeClientSecret?: string,
    price: number
}

export default function Form({ apartmentData, availabilityData, stripeClientSecret, price }: CheckoutFormProps) {
    const stripeOptions = {
        clientSecret: stripeClientSecret ?? '',
        appearance: appConfig.stripe.appearance,
    };
    const router = useRouter();

    const t = useTranslations();
    const {control, handleSubmit, setValue, getValues} = useForm({
        defaultValues: {
            name: '',
            lastname: '',
            email: '',
            phone: '',
            guest: 'me',
            payment: stripeOptions.clientSecret.length ? 'card' : 'cash',
        },
    });

    const handleRadioChange = (value: string, radio: "guest" | "payment") => {
        if (radio === "payment") {
            setIsStripePayment(value === 'card');
        }

        setValue(radio, value);
    };
    const isDisabled = !availabilityData.isAvailable;

    const [errorMessage, setErrorMessage] = useState('');

    const { createOrder } = useOrders();

    const stripe = useStripe();
    const elements = useElements();

    const [isStripePayment, setIsStripePayment] = useState(true);

    const onSubmit: SubmitHandler<CheckoutFormData> = async (data: CheckoutFormData) => {
        if (stripeOptions.clientSecret.length && isStripePayment && (!stripe || !elements)) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const createOrderResponse = await createOrder({
            ...data,
            stripeClientSecret
        })

        if (createOrderResponse.ok) {
            /**
             * Successfully created order: card payment
             */
            if (stripeOptions.clientSecret.length
                && isStripePayment
                && stripe !== null
                && elements !== null
            ) {
                const {error} = await stripe.confirmPayment({
                    //`Elements` instance that was used to create the Payment Element
                    elements,
                    confirmParams: {
                        return_url: `${window.location.origin}?paymentResult`,
                    },
                });


                if (error) {
                    // This point will only be reached if there is an immediate error when
                    // confirming the payment. Show error to your customer (for example, payment
                    // details incomplete)
                    setErrorMessage(error?.message ?? '');
                } else {
                    // Your customer will be redirected to your `return_url`. For some payment
                    // methods like iDEAL, your customer will be redirected to an intermediate
                    // site first to authorize the payment, then redirected to the `return_url`.
                }
            } else {
                router.push('/?success=true');
                /**
                 * Successfully created order: cash payment
                 */
            }
        } else {
            // Error handling
            if (createOrderResponse?.body?.phone) {
                alert(createOrderResponse.body.phone);
            } else if (createOrderResponse?.body?.code) {
                if (createOrderResponse.body.code === 'ORDER_EXISTS') {
                    alert(createOrderResponse.body.message);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'bg-white rounded-xl p-[20px] xl:px-[80px] xl:py-[60px] col-span-2'}>
            <div className={'flex flex-col gap-[15px]'}>
                <b className={'text-lg xl:text-xl font-semibold'}>{t("checkout.form.specifyYourData")}</b>
                <div className={'text-sm xl:text-lg'}>{t("checkout.form.specifyYourDataDescription")}</div>
            </div>
            <div className={'grid grid-cols-1 xl:grid-cols-2 mt-[30px] xl:mt-[60px] gap-x-[30px] gap-y-[20px]'}>
                <div className={'flex flex-col'}>
                    <Controller
                        render={({field}) => (
                            <Input
                                type={`text`}
                                variant={'lite'}
                                placeholder={t('addApartmentForm.name')}
                                {...field}
                            />
                        )}
                        disabled={isDisabled}
                        name={'name'}
                        control={control}
                    />
                </div>
                <div className={'flex flex-col'}>
                    <Controller
                        render={({field}) => (
                            <Input
                                type={`text`}
                                variant={'lite'}
                                placeholder={t('addApartmentForm.lastname')}
                                {...field}
                            />
                        )}
                        disabled={isDisabled}
                        name={'lastname'}
                        control={control}
                    />
                </div>
                <div className={'flex flex-col gap-[15px]'}>
                    <Controller
                        render={({field}) => (
                            <Input
                                type={`email`}
                                variant={'lite'}
                                placeholder={'E-mail'}
                                {...field}
                            />
                        )}
                        disabled={isDisabled}
                        name={'email'}
                        control={control}
                    />
                    <span className={'text-sm xl:text-lg'}>{t("checkout.form.emailFieldDescription")}</span>
                </div>
                <div className={'flex flex-col gap-[15px]'}>
                    <Controller
                        render={({field}) => (
                            <Input
                                type={`ua`}
                                variant={'lite'}
                                inputType={'number'}
                                value={field.value}
                                onChange={(value: any) => field.onChange(value)}
                            />
                        )}
                        disabled={isDisabled}
                        name={'phone'}
                        control={control}
                    />
                    <span className={'text-sm xl:text-lg'}>{t("checkout.form.phoneFieldDescription")}</span>
                </div>
            </div>
            <div className={'mt-[30px] xl:mt-[60px] pb-[30px] xl:pb-[60px] border-b border-b-foreground-secondary'}>
                <b className={'text-xl'}>{t("checkout.form.guest.subSectionTitle")}</b>
                <RadioGroup defaultValue={getValues('guest')} className={'flex mt-[20px] gap-[50px] flex-wrap xl:flex-nowrap'}
                            onValueChange={(newVal) => handleRadioChange(newVal, 'guest')}
                            disabled={isDisabled}
                >
                    <div className={'flex gap-[10px] items-center'}>
                        <RadioGroupItem value="me" id="r1"/>
                        <label className={'text-sm xl:text-lg text-foreground font-medium'} htmlFor="r1">{t("me")}</label>
                    </div>
                    <div className={'flex gap-[10px] items-center'}>
                        <RadioGroupItem value="another" id="r2"/>
                        <label className={'text-sm xl:text-lg text-foreground font-medium'}
                               htmlFor="r2">{t("checkout.form.guest.variants.another")}</label>
                    </div>
                </RadioGroup>
            </div>
            <div className={'py-[30px] xl:py-[60px]'}>
                <b className={'text-[25px] xl:text-[30px] text-foreground font-extrabold uppercase block'}>
                    {t("checkout.form.payment.sectionTitle")}
                </b>
                <b className={'text-lg xl:text-xl block mt-[20px] xl:mt-[30px]'}>{t("checkout.form.payment.subSectionTitle")}</b>
                <RadioGroup defaultValue={getValues('payment')}
                            className={'flex mt-[20px] gap-[20px] xl:gap-[50px] flex-wrap xl:flex-nowrap'}
                            onValueChange={(newVal) => handleRadioChange(newVal, 'payment')}
                            disabled={isDisabled}
                >
                    <div className={'flex gap-[10px] items-center'}>
                        <RadioGroupItem value="cash" id="p1"/>
                        <label className={'text-sm xl:text-lg text-foreground font-medium'}
                               htmlFor="p1">{t("checkout.form.payment.variants.cash")}</label>
                    </div>
                    <div className={'flex gap-[10px] items-center'}>
                        <RadioGroupItem value="card" id="p2"/>
                        <label className={'text-sm xl:text-lg  text-foreground font-medium'}
                               htmlFor="p2">{t("checkout.form.payment.variants.card")}</label>
                    </div>
                </RadioGroup>
            </div>

            {stripeOptions.clientSecret.length && isStripePayment ? <PaymentElement/> : ''}
            <div className={'flex justify-center mt-0 xl:mt-5'}>
                <Button disabled={!availabilityData.isAvailable}>
                    {isStripePayment
                        ? t('checkout.form.button', {total: price, currency: appConfig.defaultCurrency})
                        : t('checkout.form.submit')
                    }
                </Button>
            </div>
        </form>
    );
};
