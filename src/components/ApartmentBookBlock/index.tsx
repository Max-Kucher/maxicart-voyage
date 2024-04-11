'use client'

import React, {SyntheticEvent, useRef, useState} from 'react';
import {Checkbox} from '../ui/checkbox';
import {CheckIcon} from 'lucide-react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Datepicker from "@/components/ui/datepicker";
import CountPiker from "@/components/ui/countpiker";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import {add} from "date-fns";
import {getCookie, setCookie} from 'cookies-next';
import SearchApartmentsFormData from "@/types/SearchApartmentsFormData";
import {convertSearchApartmentsFormDataToApartmentsSearchParams} from "@/lib/utils";
import useApartments from "@/composables/useApartments";
import appConfig from "@/config/app";
import {Link, useRouter} from "@/src/navigation";

interface ApartmentBookBlockProps {
    apartmentId: number,
}

const ApartmentBookBlock = ({apartmentId}: ApartmentBookBlockProps) => {
    const {checkApartment} = useApartments();
    const router = useRouter();

    const bookingUrl = `/rent/${apartmentId}/book`;

    let savedSearch: SearchApartmentsFormData | null = null;
    const savedSearchCookie: any = getCookie(appConfig.cookieKeys.apartmentFormSearch);

    if (savedSearchCookie !== undefined) {
        savedSearch = JSON.parse(savedSearchCookie);
    }

    const t = useTranslations();
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
            <div className={'text-base md:text-xl text-black font-semibold text-center lg:text-left'}>Выберите даты заезда, выезда и количество гостей</div>
            <div className={'flex md:flex-wrap 2xl:flex-nowrap md:flex-row flex-col gap-[20px] md:items-end items-center mt-[30px]'}>
                <div className={'flex flex-col w-full'}>
                       <span className={'mb-[10px] text-lg'}>
                           {t('filterForm.date')}
                       </span>
                    <Controller
                        name={'date'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <Datepicker placeholder={t('filterForm.dateRange')} date={value}
                                        setDate={(data) => onChange(data)}/>
                        )}
                    />
                </div>
                <div className={'flex flex-col w-full'}>
                       <span className={'mb-[10px] text-lg'}>
                           {t('filterForm.peopleCount')}
                       </span>
                    <Controller
                        name={'general'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <CountPiker
                                onSetValue={(id, num) => onChange({...value, [id]: num})}
                                list={[
                                    {
                                        label: t('filterForm.adult', {count: value.adult}),
                                        id: 'adult'
                                    },
                                    {
                                        label: t('filterForm.child', {count: value.child}),
                                        id: 'child',
                                    },
                                    {
                                        label: t('filterForm.room', {count: value.room}),
                                        id: 'room'
                                    }
                                ]}
                                disabled={['room']}
                                values={value}
                                text={`${value.adult} ${t('filterForm.human')} - ${value.child} ${t('filterForm.child', {count: value.child})} - ${value.room} ${t('filterForm.room', {count: value.room})}`}
                            />
                        )}/>
                </div>
                <Button>{t('apartment.additionalService.apply')}</Button>
                <div className={'md:hidden block w-full xl:w-1/3 my-[40px] md:mt-0'}>
                    <div className={'p-[23px] border border-foreground-secondary rounded-lg flex flex-col gap-[18px]'}>
                        <div className={'flex items-center gap-[10px] md:gap-[30px]'}>
                            <Checkbox/>
                            <label className={'text-xs md:text-lg font-medium'}><span className={'text-primary'}>+1</span> <span>Кровать для ребенка</span></label>
                        </div>
                        <div className={'flex items-center gap-[10px] md:gap-[30px]'}>
                            <Checkbox/>
                            <label className={'text-xs md:text-lg font-medium'}><span className={'text-primary'}>+1</span> <span>{t('apartment.additionalService.taxi')}</span></label>
                        </div>
                        <div className={'flex items-center gap-[10px] md:gap-[30px]'}>
                            <Checkbox/>
                            <label className={'text-xs md:text-lg font-medium'}>{t('apartment.additionalService.taxi')}</label>
                        </div>
                        <div className={'text-xs md:text-lg font-medium'}>{t('apartment.additionalService.service')} <span className={'text-primary cursor-pointer'}>{t('apartment.additionalService.more')}</span></div>
                    </div>
                </div>
                <Button className={bookingDisabled ? 'pointer-events-none opacity-60' : ''} asChild={true}
                        onClick={handleRoomBookingButtonClick}>
                    <Link href={bookingUrl}>
                        {t('apartment.additionalService.book')}
                    </Link>
                </Button>
            </div>
            <div className={'flex mt-[60px] md:justify-between md:flex-row flex-col'}>
                <div>
                    <b className={'text-base md:text-xl text-black font-semibold'}>Удобства и услуги</b>
                    <div className={'grid md:grid-cols-2 grid-cols-1 gap-x-[100px] mt-[30px]'}>
                        <div>
                            <b className={'text-base md:text-xl text-black font-semibold'}>Ванная комната</b>
                            <ul className={'list-none list-inside mt-[14px]'}>
                                <li className={'text-foreground text-sm md:text-lg flex gap-[15px]'}>
                                    <CheckIcon className={'text-primary'}/>
                                    <span>Ванная комната</span>
                                </li>
                                <li className={'text-foreground text-sm md:text-lg flex gap-[15px]'}>
                                    <CheckIcon className={'text-primary'}/>
                                    <span>Ванная комната</span>
                                </li>
                                <li className={'text-foreground text-sm md:text-lg flex gap-[15px]'}>
                                    <CheckIcon className={'text-primary'}/>
                                    <span>Ванная комната</span>
                                </li>
                                <li className={'text-foreground text-sm md:text-lg flex gap-[15px]'}>
                                    <CheckIcon className={'text-primary'}/>
                                    <span>Ванная комната</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={'md:block hidden w-full xl:w-1/3 mt-[40px] md:mt-0'}>
                    <div className={'p-[23px] border border-background rounded-lg flex flex-col gap-[18px]'}>
                        <div className={'flex items-center gap-[10px] md:gap-[30px]'}>
                            <Checkbox/>
                            <label className={'text-xs md:text-lg font-medium'}><span className={'text-primary'}>+1</span> <span>Кровать для ребенка</span></label>
                        </div>
                        <div className={'flex items-center gap-[10px] md:gap-[30px]'}>
                            <Checkbox/>
                            <label className={'text-xs md:text-lg font-medium'}><span className={'text-primary'}>+1</span> <span>Кровать для взрослого</span></label>
                        </div>
                        <div className={'flex items-center gap-[10px] md:gap-[30px]'}>
                            <Checkbox/>
                            <label className={'text-xs md:text-lg font-medium'}>Трансфер от/до аэропорта</label>
                        </div>
                        <div className={'text-lg font-medium'}>
                            {t('apartment.additionalService.service')} <span className={'text-primary cursor-pointer'}>{t('apartment.additionalService.more')} </span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ApartmentBookBlock;
