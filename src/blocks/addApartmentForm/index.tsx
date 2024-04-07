'use client'
import React from 'react';
import 'react-phone-input-2/lib/style.css'
import {Input} from "@/components/ui/input";
import {Button} from '@/components/ui/button';
import {Textarea} from "@/components/ui/textarea";
import {Controller, useForm} from "react-hook-form";
import { useTranslations } from 'next-intl';

const AddApartmentForm = () => {
    const t = useTranslations('addApartmentForm');
    const {control, handleSubmit} = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
    })
    return (
        <div className={'bg-background pb-[80px] pt-[100px]'}>
            <div className={'container'}>
                <div className={'flex px-[83px] py-[80px] gap-[80px] w-[1075px] mx-auto bg-white rounded-lg'}>
                    <div className={'w-8/12 flex flex-col gap-[24px] '}>
                        <h2 className={'text-3xl uppercase font-semibold'}>
                            {t('title')}
                        </h2>
                        <b className={'text-xl font-semibold'}>{t('subtitle')}</b>
                        <p className={'text-lg font-medium'}>
                            {t('description')}
                        </p>
                    </div>
                    <div className={'flex flex-col w-full gap-[15px]'}>

                        <Controller
                            render={({field}) => (
                                <Input variant={'lite'} placeholder={t('name')} {...field} />
                            )}
                            name={'name'}
                            control={control}
                        />
                        <Controller
                            render={({field}) => (
                                <Input variant={'lite'} placeholder={'E-mail'} {...field} />
                            )}
                            name={'email'}
                            control={control}
                        />
                        <Controller
                            render={({field}) => (
                                <Input variant={'lite'} inputType={'number'} value={field.value} onChange={(value: any) => field.onChange(value)}/>
                            )}
                            name={'phone'}
                            control={control}
                        />
                        <Controller
                            render={({field}) => (
                                <Textarea variant={'lite'} placeholder={t('message')} {...field}/>
                            )}
                            name={'message'}
                            control={control}
                        />
                        <div className={'font-semibold text-foreground-secondary text-base w-10/12 mt-[5px]'}>
                            {t('agreement')}
                        </div>
                        <div className={'flex justify-center'}>
                            <Button>
                                {t('send')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddApartmentForm;
