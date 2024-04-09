import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { CheckIcon } from 'lucide-react';
import {Controller, useForm} from "react-hook-form";
import Datepicker from "@/components/ui/datepicker";
import CountPiker from "@/components/ui/countpiker";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import {add} from "date-fns";

const ApartmentBookBlock = () => {
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
        },
    })

    return (
        <div className={'bg-white rounded-lg px-[30px] py-[60px] mt-[30px]'}>
            <b className={'text-xl text-black font-semibold'}>Выберите даты заезда, выезда и количество гостей</b>
            <div className={'flex gap-[20px] items-end mt-[30px]'}>
                <div>
                       <span className={'mb-[10px] text-lg'}>
                           {t('date')}
                       </span>
                    <Controller
                        name={'date'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <Datepicker placeholder={t('dateRange')} date={value}
                                        setDate={(data) => onChange(data)}/>
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
                <Button>Применить</Button>
                <Button>Забронировать</Button>
            </div>
            <div className={'flex mt-[60px] justify-between'}>
                <div>
                    <b className={'text-xl text-black font-semibold'}>Удобства и услуги</b>
                    <div className={'grid grid-cols-2 gap-x-[100px] mt-[30px]'}>
                        <div>
                            <b className={'text-xl text-black font-semibold'}>Ванная комната</b>
                            <ul className={'list-none list-inside mt-[14px]'}>
                                <li className={'text-foreground text-lg flex gap-[15px]'}>
                                    <CheckIcon className={'text-primary'}/>
                                    <span>Ванная комната</span>
                                </li>
                                <li className={'text-foreground text-lg flex gap-[15px]'}>
                                    <CheckIcon className={'text-primary'}/>
                                    <span>Ванная комната</span>
                                </li>
                                <li className={'text-foreground text-lg flex gap-[15px]'}>
                                    <CheckIcon className={'text-primary'}/>
                                    <span>Ванная комната</span>
                                </li>
                                <li className={'text-foreground text-lg flex gap-[15px]'}>
                                    <CheckIcon className={'text-primary'}/>
                                    <span>Ванная комната</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={'w-1/3'}>
                    <div className={'p-[23px] border border-background rounded-lg flex flex-col gap-[18px]'}>
                        <div className={'flex items-center gap-[30px]'}>
                            <Checkbox/>
                            <label className={'text-lg font-medium'}><span className={'text-primary'}>+1</span> <span>Кровать для ребенка</span></label>
                        </div>
                        <div className={'flex items-center gap-[30px]'}>
                            <Checkbox/>
                            <label className={'text-lg font-medium'}><span className={'text-primary'}>+1</span> <span>Кровать для взрослого</span></label>
                        </div>
                        <div className={'flex items-center gap-[30px]'}>
                            <Checkbox/>
                            <label className={'text-lg font-medium'}>Трансфер от/до аэропорта</label>
                        </div>
                        <div className={'text-lg font-medium'}>
                            Тур услуги <span className={'text-primary cursor-pointer'}>подробнее...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApartmentBookBlock;
