'use client'

import React from "react";
import {useTranslations} from "next-intl";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import Apartment from "@/types/Apartment";

interface CheckoutFormProps {
    apartmentData: Apartment;
}

export default function CheckoutForm({ apartmentData }: CheckoutFormProps) {
    const t = useTranslations();
    const {control, handleSubmit} = useForm({
        defaultValues: {
            name: '',
            lastname: '',
            email: '',
            phone: '',
        },
    });

    return (<form className={'bg-white rounded-xl px-[80px] py-[60px] col-span-2'}>
        <div className={'flex flex-col gap-[15px]'}>
            <b className={'text-xl font-semibold'}>Введите свои данные</b>
            <div className={'text-lg'}>Пожалуйста, укажите все свои данные латинскими буквами</div>
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
                    name={'email'}
                    control={control}
                />
                <span>
                                    На этот адрес будет отправлено подтверждение бронирования
                                </span>
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
                    name={'phone'}
                    control={control}
                />
                <span>
                                   Необходимо чтобы удостовериться в действительности вашего бронирования
                                </span>
            </div>
        </div>
        <div className={'mt-[60px] pb-[60px] border-b border-b-foreground-secondary'}>
            <b className={'text-xl'}>Кто основной гость?</b>
            <RadioGroup className={'flex mt-[20px] gap-[50px]'}>
                <div className={'flex gap-[10px] items-center'}>
                    <RadioGroupItem value="me" id="r1"/>
                    <label className={'text-lg text-foreground font-medium'} htmlFor="r1">Я</label>
                </div>
                <div className={'flex gap-[10px] items-center'}>
                    <RadioGroupItem value="another" id="r2"/>
                    <label className={'text-lg text-foreground font-medium'} htmlFor="r2">Другой
                        человек</label>
                </div>
            </RadioGroup>
        </div>
        <div className={'py-[60px]'}>
            <b className={'text-[30px] text-foreground font-extrabold uppercase block'}>Детали
                оплаты</b>
            <b className={'text-xl block mt-[30px]'}>Кто основной гость?</b>
            <RadioGroup className={'flex mt-[20px] gap-[50px]'}>
                <div className={'flex gap-[10px] items-center'}>
                    <RadioGroupItem value="me" id="r1"/>
                    <label className={'text-lg text-foreground font-medium'} htmlFor="r1">Наличными по
                        приезду</label>
                </div>
                <div className={'flex gap-[10px] items-center'}>
                    <RadioGroupItem value="another" id="r2"/>
                    <label className={'text-lg text-foreground font-medium'} htmlFor="r2">Кредитная
                        карта (сейчас)</label>
                </div>
            </RadioGroup>
        </div>
    </form>);
}
