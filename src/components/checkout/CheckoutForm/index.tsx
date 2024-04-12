'use client'

import React from "react";
import {useTranslations} from "next-intl";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import Apartment from "@/types/Apartment";

interface CheckoutFormProps {
    apartmentData: Apartment;
    availabilityData: {
        isAvailable: boolean,
        errorMessage: string,
    },
}

export default function CheckoutForm({ apartmentData, availabilityData }: CheckoutFormProps) {
    const t = useTranslations();
    const {control, handleSubmit, setValue, getValues} = useForm({
        defaultValues: {
            name: '',
            lastname: '',
            email: '',
            phone: '',
            guest: 'me',
            payment: 'card',
        },
    });

    const handleRadioChange = (value: string, radio: "guest" | "payment") => {
        setValue(radio, value);
    };
    const isDisabled = !availabilityData.isAvailable;

    return (<form className={'bg-white rounded-xl px-[80px] py-[60px] col-span-2'}>
        {isDisabled ? (<div className="flex p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
             role="alert"
        >
            <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <div>
                <span className="font-medium">{availabilityData.errorMessage}</span>
            </div>
        </div>) : ''}


        <div className={'flex flex-col gap-[15px]'}>
            <b className={'text-xl font-semibold'}>{t("checkout.form.specifyYourData")}</b>
            <div className={'text-lg'}>{t("checkout.form.specifyYourDataDescription")}</div>
        </div>
        <div className={'grid grid-cols-2 mt-[60px] gap-x-[30px] gap-y-[20px]'}>
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
                <span>{t("checkout.form.emailFieldDescription")}</span>
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
                <span>{t("checkout.form.phoneFieldDescription")}</span>
            </div>
        </div>
        <div className={'mt-[60px] pb-[60px] border-b border-b-foreground-secondary'}>
            <b className={'text-xl'}>{t("checkout.form.guest.subSectionTitle")}</b>
            <RadioGroup defaultValue={getValues('guest')} className={'flex mt-[20px] gap-[50px]'}
                        onValueChange={(newVal) => handleRadioChange(newVal, 'guest')}
                        disabled={isDisabled}
            >
                <div className={'flex gap-[10px] items-center'}>
                    <RadioGroupItem value="me" id="r1"/>
                    <label className={'text-lg text-foreground font-medium'} htmlFor="r1">{t("me")}</label>
                </div>
                <div className={'flex gap-[10px] items-center'}>
                    <RadioGroupItem value="another" id="r2"/>
                    <label className={'text-lg text-foreground font-medium'}
                           htmlFor="r2">{t("checkout.form.guest.variants.another")}</label>
                </div>
            </RadioGroup>
        </div>
        <div className={'py-[60px]'}>
            <b className={'text-[30px] text-foreground font-extrabold uppercase block'}>
                {t("checkout.form.payment.sectionTitle")}
            </b>
            <b className={'text-xl block mt-[30px]'}>{t("checkout.form.payment.subSectionTitle")}</b>
            <RadioGroup defaultValue={getValues('payment')}
                        className={'flex mt-[20px] gap-[50px]'}
                        onValueChange={(newVal) => handleRadioChange(newVal, 'payment')}
                        disabled={isDisabled}
            >
                <div className={'flex gap-[10px] items-center'}>
                    <RadioGroupItem value="cash" id="p1"/>
                    <label className={'text-lg text-foreground font-medium'}
                           htmlFor="p1">{t("checkout.form.payment.variants.cash")}</label>
                </div>
                <div className={'flex gap-[10px] items-center'}>
                    <RadioGroupItem value="card" id="p2"/>
                    <label className={'text-lg text-foreground font-medium'}
                           htmlFor="p2">{t("checkout.form.payment.variants.card")}</label>
                </div>
            </RadioGroup>
        </div>
    </form>);
}
