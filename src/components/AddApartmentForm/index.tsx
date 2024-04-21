'use client';
import React, {useState} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import useRentForm from "@/composables/useRentForm";
import RentOutFormData from "@/types/RentOutFormData";
import {useTranslations} from "next-intl";

const AddApartmentForm = () => {
    const tf = useTranslations();
    const t = useTranslations('addApartmentForm');
    const {control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
    });

    const { submit: formSubmitHandler } = useRentForm();
    const [formLoading, setFormLoading] = useState(false);

    const onSubmit: SubmitHandler<RentOutFormData> = async (data: RentOutFormData) => {
        setFormLoading(true);
        try {
            await formSubmitHandler(data);
        } catch (e) {
            console.log(e);
        }

        setFormLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col w-full gap-[10px] md:gap-[15px] md:mt-[40px] xl:mt-0'}>
            <Controller
                name={'name'}
                control={control}
                rules={{ required: true }}
                disabled={formLoading}
                render={({field}) => (
                    <Input
                        type={`text`}
                        variant={'lite'}
                        placeholder={t('name')}
                        {...field}
                        error={!!errors.name}
                        errorMessage={tf.markup('forms.validation.required', {
                            field: () => `<b>${t('name').toLowerCase()}</b>`,
                        })}
                    />
                )}
            />
            <Controller
                name={'email'}
                control={control}
                rules={{ required: true }}
                disabled={formLoading}
                render={({field}) => (
                    <Input
                        type={`email`}
                        variant={'lite'}
                        placeholder={'E-mail'}
                        {...field}
                        error={!!errors.email}
                        errorMessage={tf.markup('forms.validation.required', {
                            field: () => `<b>${'E-mail'.toLowerCase()}</b>`,
                        })}
                    />
                )}
            />
            <Controller
                rules={{ required: true, minLength: 6 }}
                name={'phone'}
                control={control}
                disabled={formLoading}
                render={({field}) => (
                    <Input
                        type={`tel`}
                        variant={'lite'}
                        inputType={'number'}
                        value={field.value}
                        onChange={(value: any) => field.onChange(value)}
                        error={!!errors.phone}
                        errorMessage={tf.markup('forms.validation.required', {
                            field: () => `<b>${tf('forms.fields.phone').toLowerCase()}</b>`,
                        })}
                    />
                )}
            />
            <Controller
                name={'message'}
                control={control}
                rules={{ maxLength: 200 }}
                disabled={formLoading}
                render={({field}) => (
                    <Textarea
                        variant={'lite'}
                        placeholder={t('message')}
                        {...field}
                        error={!!errors.message}
                        errorMessage={tf('forms.validation.maxLength', {
                            maxLength: 200,
                        })}
                    />
                )}
            />
            <div className={'font-semibold text-foreground-secondary md:text-base text-[10px] w-10/12 mt-[5px]'}>
                {t('agreement')}
            </div>
            <div className={'flex justify-center'}>
                <Button disabled={formLoading}>
                    {formLoading ? tf('sendingInProgress') : t('send')}
                </Button>
            </div>
        </form>
    );
};

export default AddApartmentForm;
