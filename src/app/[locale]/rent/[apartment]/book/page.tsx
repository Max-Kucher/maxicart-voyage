'use client'
import PageNavigation from "@/components/PageNavigation";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {useTranslations} from "next-intl";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import UsersIcon from "@/components/icons/users";
import {MapPinIcon, Maximize2Icon} from "lucide-react";
import BedIcon from "@/components/icons/bed";
import BathIcon from "@/components/icons/bath";


export default function RentIndex() {
    const t = useTranslations('addApartmentForm');
    const {control, handleSubmit} = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            lastname: '',
        },
    });

    return (<main>
            <div className="container">
                <div className={'mt-[20px] md:mt-[40px] 2xl:mt-[70px] md:mb-[30px] mb-[20px]'}>
                    <PageNavigation/>
                </div>
                <div className={'grid grid-cols-1 md:grid-cols-3 gap-[20px]'}>
                    <div className={'bg-white rounded-xl py-[60px] px-[30px] col-span-1'}>
                        <b className={'text-xl font-semibold'}>Детали вашего бронирования</b>
                        <div className={'p-[20px] border border-[#D6D6D6] rounded-xl mt-[30px]'}>
                            <b className={'text-xl'}>Azizi Shaista JA studio 409</b>
                            <div className={'mt-[20px]'}>
                                <div className={'flex items-center gap-[15px]'}>
                                    <UsersIcon className={'text-primary w-[27px] h-[27px]'}/>
                                    <span className={'text-lg font-medium text-foreground'}>
                                        {t('maxPeople', {maxPeople: 2})}
                                    </span>
                                </div>
                            </div>
                            <div className={'flex items-center gap-[15px] mt-[10px] text-foreground-secondary'}>
                                <MapPinIcon className={'h-[30px] w-[26px]'}/>
                                <span className={'text-lg font-medium'}>asd asdasdasd asdasdasd</span>
                            </div>
                            <div className={'flex justify-between'}>
                                <div className={'flex flex-wrap gap-[15px] mt-[20px] text-foreground-secondary'}>
                                    <div
                                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                                        <BedIcon className={'w-[39px] h-[26px]'}/>
                                        <span className={'text-lg font-semibold'}>2</span>
                                    </div>
                                    <div
                                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                                        <BathIcon className={'w-[39px] h-[26px]'}/>
                                        <span className={'text-lg font-semibold'}>3</span>
                                    </div>
                                    <div
                                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                                        <Maximize2Icon className={'h-[23px] w-[23px]'}/>
                                        <span className={'text-lg font-semibold'}>123 M2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'bg-white rounded-xl px-[80px] py-[60px] col-span-2'}>
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
                                            placeholder={t('name')}
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
                                            placeholder={t('name')}
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
                    </div>
                </div>
            </div>
        </main>
    )
};
