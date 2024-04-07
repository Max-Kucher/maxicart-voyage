'use client'
import React from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {Input} from "@/components/ui/input";
import {Button} from '../ui/button';
import {Textarea} from "@/components/ui/textarea";
import {Controller, useForm} from "react-hook-form";
import {add} from "date-fns/index";

const AddApartmentForm = () => {
    const {control, handleSubmit} = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
    })
    return (
        <div className={'flex px-[83px] py-[80px] gap-[80px] w-[1075px] mx-auto'}>
            <div className={'w-8/12 flex flex-col gap-[24px] '}>
                <h2 className={'text-3xl uppercase font-semibold'}>
                    Владеете недвижимостью в Дубае?
                </h2>
                <b className={'text-xl font-semibold'}>Хотите разместить жилье?</b>
                <p className={'text-lg font-medium'}>
                    Оставьте заявку и наши специалисты свяжутся с вами в близлежащее
                    время
                </p>
            </div>
            <div className={'flex flex-col w-full gap-[15px]'}>

                <Controller
                    render={({field}) => (
                        <Input placeholder={'Имя'} {...field} />
                    )}
                    name={'name'}
                    control={control}
                />
                <Controller
                    render={({field}) => (
                        <Input placeholder={'E-mail'} {...field} />
                    )}
                    name={'email'}
                    control={control}
                />
                <Controller
                    render={({field}) => (
                        <Input variant={'number'} value={field.value} onChange={(value: any) => field.onChange(value)}/>
                    )}
                    name={'phone'}
                    control={control}
                />
                <Controller
                    render={({field}) => (
                        <Textarea placeholder={'Cообщение'} {...field}/>
                    )}
                    name={'phone'}
                    control={control}
                />
                <div className={'font-semibold text-foreground-secondary text-base w-10/12 mt-[5px]'}>
                    Отправляя данную форму вы соглашаетесь с политикой конфиденциальности
                </div>
                <div className={'flex justify-center'}>
                    <Button>
                        Отправить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddApartmentForm;
