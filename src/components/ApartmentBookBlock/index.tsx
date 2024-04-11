'use client'

import React, {SyntheticEvent, useRef, useState} from 'react';
import { Checkbox } from '../ui/checkbox';
import { CheckIcon } from 'lucide-react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Datepicker from "@/components/ui/datepicker";
import CountPiker from "@/components/ui/countpiker";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import {add} from "date-fns";
import { getCookie, setCookie } from 'cookies-next';
import SearchApartmentsFormData from "@/types/SearchApartmentsFormData";
import {convertSearchApartmentsFormDataToApartmentsSearchParams} from "@/lib/utils";
import useApartments from "@/composables/useApartments";
import appConfig from "@/config/app";
import { Link, useRouter } from "@/src/navigation";

interface ApartmentBookBlockProps {
    apartmentId: number,
}

const ApartmentBookBlock = ({ apartmentId }: ApartmentBookBlockProps) => {
    const { checkApartment } = useApartments();
    const router = useRouter();

    const bookingUrl = `/rent/${apartmentId}/book`;

    let savedSearch: SearchApartmentsFormData | null = null;
    const savedSearchCookie: any = getCookie(appConfig.cookieKeys.apartmentFormSearch);

    if (savedSearchCookie !== undefined) {
        savedSearch = JSON.parse(savedSearchCookie);
    }

    const t = useTranslations('filterForm');
    const {control, handleSubmit, getValues} = useForm({
        defaultValues: {
            date: {
                from: add(new Date(savedSearch?.date?.from ?? new Date()), {
                    days: savedSearch?.date !== undefined ? 0 : 1,
                }),
                to: add(new Date(savedSearch?.date?.to ?? new Date()), {
                    days: savedSearch?.date !== undefined ? 0 : 2,
                }),
            },
            general: {
                room: savedSearch?.general?.room ?? 1,
                adult: savedSearch?.general?.adult ?? 1,
                child: savedSearch?.general?.child ?? 0,
            },
        },
    })

    const [bookingDisabled, setBoockingDisabled] = useState(false);
    const onSubmit: SubmitHandler<SearchApartmentsFormData> = async (data: SearchApartmentsFormData) => {
        const checkResult = await checkApartment(apartmentId, convertSearchApartmentsFormDataToApartmentsSearchParams(data))

        if (checkResult.status >= 400) {
            setBoockingDisabled(true);
            return;
        }

        setBoockingDisabled(false);

        // ToDo: Change prices and other stuff
        console.log(checkResult);
    };

    const handleRoomBookingButtonClick = (e: SyntheticEvent) => {
        e.preventDefault();
        const values = getValues();

        setCookie(appConfig.cookieKeys.checkoutData, JSON.stringify(values));
        setCookie(`${appConfig.cookieKeys.checkoutData}-backend`, convertSearchApartmentsFormDataToApartmentsSearchParams(values));

        router.push(bookingUrl);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'bg-white rounded-lg px-[30px] py-[60px] mt-[30px]'}>
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
                                        label: t('adult', { count: value.adult }),
                                        id: 'adult'
                                    },
                                    {
                                        label: t('child', { count: value.child }),
                                        id: 'child',
                                    },
                                    {
                                        label: t('room', { count: value.room }),
                                        id: 'room'
                                    }
                                ]}
                                disabled={['room']}
                                values={value}
                                text={`${value.adult} ${t('human')} - ${value.child} ${t('child', { count: value.child })} - ${value.room} ${t('room', { count: value.room })}`}
                            />
                        )}/>
                </div>
                <Button>Применить</Button>
                <Button className={bookingDisabled ? 'pointer-events-none opacity-60' : ''} asChild={true} onClick={handleRoomBookingButtonClick}>
                    <Link href={bookingUrl}>
                        Забронировать
                    </Link>
                </Button>
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
        </form>
    );
};

export default ApartmentBookBlock;
