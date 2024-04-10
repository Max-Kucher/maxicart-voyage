'use client'
import React from 'react';
import 'react-phone-input-2/lib/style.css'
import {Input} from "@/components/ui/input";
import {Button} from '@/components/ui/button';
import {Textarea} from "@/components/ui/textarea";
import {Controller, useForm, SubmitHandler} from "react-hook-form";
import { useTranslations } from 'next-intl';
import RentOutFormData from "@/types/RentOutFormData";
import useRentForm from "@/composables/useRentForm";
import AddApartmentForm from '@/src/components/AddApartmentForm';

const AddApartmentFormBlock = () => {
    const t = useTranslations('addApartmentForm');

    return (
        <div className={'2xl:bg-background xl:pb-[80px] xl:pt-[100px] md:pb-[60px] md:pt-[60px]'}>
            <div className={'container'}>
                <div className={'flex flex-wrap xl:flex-nowrap 2xl:px-[83px] 2xl:py-[80px] xl:px-[62px] xl:py-[60px] 2xl:gap-[80px] 2xl:w-[1075px] md:py-[60px] md:px-[50px] mx-auto bg-white rounded-lg'}>
                    <div className={'w-8/12 flex flex-col xl:gap-[24px] xl:text-left text-center mx-auto xl:mx-0 md:gap-[15px]'}>
                        <h2 className={'text-3xl uppercase font-semibold'}>
                            {t('title')}
                        </h2>
                        <b className={'text-xl font-semibold'}>{t('subtitle')}</b>
                        <p className={'text-lg font-medium'}>
                            {t('description')}
                        </p>
                    </div>
                    <AddApartmentForm/>
                </div>
            </div>
        </div>
    );
};

export default AddApartmentFormBlock;
