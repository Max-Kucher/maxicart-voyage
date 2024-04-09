'use client'

import React, {FC} from 'react';
import Datepicker from "@/components/ui/datepicker";
import {Button} from "@/components/ui/button";
import CountPiker from "@/components/ui/countpiker";
import {Input} from "@/components/ui/input";
import {Controller, useForm} from 'react-hook-form';
import { add } from 'date-fns';
import {useTranslations} from "next-intl";

const FindApartment: FC<{}> = () => {
    const t = useTranslations('filterForm');
    const {control, handleSubmit} = useForm({
        defaultValues: {
            date: {
                from: add(new Date(), {days: 1}),
                to: add(new Date(), {days: 2}),
            },
            general: {
                room: 0,
                adult: 0,
                child: 0
            },
            price: {
                from: undefined,
                to: undefined
            }
        },
    })

    const onSubmitForm = handleSubmit((data) => {})

    return (
        <form className={'2xl:w-[1350px] md:w-[600px] mx-auto'}>
            <div
                className={'bg-white md:py-[30px] md:px-[95px] 2xl:py-[30px] 2xl:px-[40px] flex 2xl:justify-between 2xl:flex-row flex-col rounded-lg gap-[20px]'}>
                <div>
                       <span className={'mb-[10px] text-lg'}>
                           {t('date')}
                       </span>
                    <Controller
                        name={'date'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <Datepicker placeholder={t('dateRange')} date={value} setDate={(data) => onChange(data)}/>
                        )}
                    />
                </div>
                <div>
                       <span className={'mb-[10px] text-lg'}>
                           {t('peopleCount')}
                       </span>
                    <Controller
                        name={'general'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <CountPiker
                                onSetValue={(id, num) => onChange({...value, [id]: num})}
                                list={[
                                    {
                                        label: t('adult'),
                                        id: 'adult'
                                    },
                                    {
                                        label: t('child'),
                                        id: 'child',
                                    },
                                    {
                                        label: t('room'),
                                        id: 'room'
                                    }
                                ]}
                                values={value}
                                text={`${value.adult} ${t('human')} - ${value.child} ${t('child')} - ${value.room} ${t('room')}`}
                            />
                        )}/>
                </div>
                <div className={'flex items-center gap-[10px]'}>
                    <div>
                           <span className={'mb-[10px] text-lg'}>
                               {t('priceFrom')}
                           </span>
                        <Controller render={({field}) => <Input type={"number"} rightText={'USD'} {...field}/>} name={'price.from'} control={control}/>
                    </div>
                    <div className={'w-[20px] h-[4px] bg-primary rounded-[5px] mt-[6%]'}/>
                    <div>
                            <span className={'mb-[10px] text-lg'}>
                                {t('priceTo')}
                            </span>
                      <Controller render={({field}) => <Input type={"number"} rightText={'USD'} {...field}/>} name={'price.to'} control={control}/>
                    </div>
                </div>
                <div className={'flex items-center justify-center 2xl:hidden'}>
                    <Button onClick={onSubmitForm} className={'inline-block'}>
                        {t('find')}
                    </Button>
                </div>
            </div>
            <div className={'2xl:flex hidden flex-col mt-[30px] items-end'}>
                <Button onClick={onSubmitForm} className={'inline-block'}>
                    {t('find')}
                </Button>
            </div>
        </form>
    );
};

export default FindApartment;
