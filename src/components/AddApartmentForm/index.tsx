'use client';
import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import useRentForm from "@/composables/useRentForm";
import RentOutFormData from "@/types/RentOutFormData";
import {useTranslations} from "next-intl";

const AddApartmentForm = () => {
    const t = useTranslations('addApartmentForm');
    const {control, handleSubmit} = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
    });

    const { submit: formSubmitHandler } = useRentForm();
    const onSubmit: SubmitHandler<RentOutFormData> = async (data: RentOutFormData) => {
        await formSubmitHandler(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col w-full gap-[15px] md:mt-[40px] xl:mt-0'}>
            <Controller
                render={({field}) => (
                    <Input
                        type={`text`}
                        variant={'lite'}
                        placeholder={t('name')}
                        {...field}
                    />
                )}
                name={'name'}
                control={control}
            />
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
            <Controller
                render={({field}) => (
                    <Input
                        type={`tel`}
                        variant={'lite'}
                        inputType={'number'}
                        value={field.value}
                        onChange={(value: any) => field.onChange(value)}
                    />
                )}
                name={'phone'}
                control={control}
            />
            <Controller
                render={({field}) => (
                    <Textarea
                        variant={'lite'}
                        placeholder={t('message')}
                        {...field}
                    />
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
        </form>
    );
};

export default AddApartmentForm;
