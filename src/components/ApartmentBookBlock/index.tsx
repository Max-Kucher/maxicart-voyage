'use client'

import React, {SyntheticEvent, useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Checkbox} from '../ui/checkbox';
import {Controller, SubmitHandler, useForm, useWatch} from "react-hook-form";
import Datepicker from "@/components/ui/datepicker";
import CountPiker from "@/components/ui/countpiker";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import SearchApartmentsFormData from "@/types/SearchApartmentsFormData";
import {convertSearchApartmentsFormDataToApartmentsSearchParams} from "@/lib/utils";
import {Link, useRouter} from "@/src/navigation";
import Apartment from "@/types/Apartment";
import {ApartmentContext} from "@/components/ApratmentProvider";


import 'leaflet/dist/leaflet.css';
import {AppContext} from "@/components/AppContext";
import {setCookie} from "cookies-next";
import {add} from 'date-fns';
import LoadingSpinner from "@/components/ui/loadingSpinner";
import {APIProvider, Map, Marker} from "@vis.gl/react-google-maps";
import {GoogleMapKey} from "@/config/app";
import useCheckApartments from "@/composables/useCheckApartment";
import {CheckIcon} from 'lucide-react';

interface ApartmentBookBlockProps {
    apartmentData: Apartment,
}

const ApartmentBookBlock = ({apartmentData}: ApartmentBookBlockProps) => {
    const apartmentId = apartmentData.id;
    const {checkApartment} = useCheckApartments();
    const router = useRouter();
    const apartmentContext: any = useContext(ApartmentContext)
    const appContext: any = useContext(AppContext)
    const t = useTranslations();

    const [bookPageMoving, setBookPageMoving] = useState(false);

    const bookingUrl = `/rent/${apartmentId}/book?bookData=`;
    const formData = appContext?.apartmentFormData
    const {control, handleSubmit, getValues, setValue, watch} = useForm({
        defaultValues: {
            date: {
                from: add(new Date(formData?.date?.from ?? new Date()), {
                    days: formData?.date !== undefined ? 0 : 1,
                }),
                to: add(new Date(formData?.date?.to ?? new Date()), {
                    days: formData?.date !== undefined ? 0 : 2,
                }),
            },
            general: {
                room: apartmentData.smoobu.rooms.bedrooms
                    ? apartmentData.smoobu.rooms.bedrooms
                    : 1,
                adult: 1,
                child: formData?.general?.child ?? 0,
            },
            addons: []
        },
    })

    const [general, date] = useWatch({control, name: ['general', 'date']})

    useEffect(() => {
        setCookie('apartmentFormData', JSON.stringify({general, date}))
        appContext?.setApartmentFormData({general, date})
    }, [general, date]);

    const [formLoading, setFormLoading] = useState(false);
    const [bookingDisabled, setBookingDisabled] = useState(false);
    const onSubmit: SubmitHandler<SearchApartmentsFormData> = async (data: SearchApartmentsFormData) => {
        setFormLoading(true);
        const checkResult = await checkApartment(apartmentId, convertSearchApartmentsFormDataToApartmentsSearchParams(data))

        setFormLoading(false);

        if (checkResult.status >= 400) {
            setBookingDisabled(true);
            return;
        }

        setBookingDisabled(false);
        apartmentContext.setApartmentPrice(checkResult.body.smoobu.price)
        apartmentContext.setApartmentNights(checkResult.body.nights)
    };

    const handleRoomBookingButtonClick = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (formLoading || bookingDisabled) {
            return;
        }

        setBookPageMoving(true);
        const values = getValues();
        const checkoutUrl = bookingUrl + btoa(JSON.stringify(values));

        await new Promise(() => router.push(checkoutUrl))
        setBookPageMoving(false);

    };

    const showMap = apartmentData.smoobu.location.latitude !== null && apartmentData.smoobu.location.longitude !== null;

    const MapComponent = () => (
        <div className={'w-full h-[240px] mt-[30px] rounded-lg overflow-hidden'}>
            <APIProvider apiKey={GoogleMapKey ?? ''}>
                <Map
                    defaultZoom={9}
                    defaultCenter={{
                        lat: parseFloat(apartmentData?.smoobu?.location?.latitude.toString()),
                        lng: parseFloat(apartmentData?.smoobu?.location?.longitude.toString())
                    }}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                />
                <Marker position={{
                    lat: parseFloat(apartmentData?.smoobu?.location?.latitude.toString()),
                    lng: parseFloat(apartmentData?.smoobu?.location?.longitude.toString())
                }}/>
            </APIProvider>
        </div>
    )

    const equipmentsKeys: string[] = Object.keys(apartmentData.equipments ?? {});

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'bg-white rounded-lg px-[30px] py-[60px] mt-[30px]'}>
            <div
                className={'text-base md:text-xl text-black font-semibold text-center lg:text-left'}>{t('filterForm.chooseFilters')}</div>
            <div
                className={'flex md:flex-wrap xl:flex-nowrap md:flex-row flex-col gap-[20px] md:items-end items-center mt-[30px]'}>
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
                                className={`grid-cols-1`}
                                disabled={['room']}
                                values={value}
                                text={`${value.adult} ${t('filterForm.human')} - ${value.child} ${t('filterForm.child', {count: value.child})} - ${value.room} ${t('filterForm.room', {count: value.room})}`}
                            />
                        )}/>
                </div>
                <Button disabled={formLoading}>
                    {formLoading ? (<LoadingSpinner className={`w-8 h-8`}/>) : t('apartment.additionalService.apply')}
                </Button>
                {!!apartmentData.addons.length && <div className={'md:hidden block w-full xl:w-1/3 my-[40px] md:mt-0'}>
                    <div className={'p-[23px] border border-foreground-secondary rounded-lg flex flex-col gap-[18px]'}>
                        {apartmentData.addons.map(apartmentAddon => {
                            const key = `apartment-bool-block-mobile-addon-${apartmentAddon.id}-${apartmentId}`;

                            return (<div key={key} className={'flex items-center gap-[10px] md:gap-[30px]'}>
                                <Checkbox id={key}/>
                                <label htmlFor={key} className={'text-xs md:text-lg font-medium'}>
                                    <span dangerouslySetInnerHTML={
                                        {__html: apartmentAddon.title.replace(/^(\+?\d+)/, '<span className="text-primary">$1</span>')}
                                    }></span>
                                    <span> (+{apartmentAddon.price} {apartmentData.smoobu.currency})</span>
                                </label>
                            </div>);
                        })}

                        {/*<div className={'text-xs md:text-lg font-medium'}>{t('apartment.additionalService.service')} <span className={'text-primary cursor-pointer'}>{t('apartment.additionalService.more')}</span></div>*/}
                    </div>
                </div>}
                <Button asChild={true}
                        onClick={handleRoomBookingButtonClick}
                        className={bookingDisabled || formLoading || bookPageMoving ? 'pointer-events-none opacity-60' : ''}
                >
                    <Link href={bookingUrl} prefetch={false}>
                        {formLoading || bookPageMoving ? (
                            <LoadingSpinner className={`w-8 h-8`}/>) : t('apartment.additionalService.book')}
                    </Link>
                </Button>
                {showMap ? (<div className={'md:hidden block w-full h-[250px] z-0'}>
                    <MapComponent/>
                </div>) : ''}
            </div>
            <div className={'flex mt-[60px] md:justify-between md:flex-col-reverse xl:flex-row flex-col'}>
                {equipmentsKeys.length &&
                <div className={'flex-1 md:mt-[20px] xl:mt-0'}>
                    <b className={'text-base md:text-xl text-black font-semibold'}>{t('apartment.service.title')}</b>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-[20px] md:mt-[40px]">
                        <div className="grid grid-rows-[auto] gap-5">
                            {
                                equipmentsKeys.slice(0, equipmentsKeys.length / 2).map((key: string) => {
                                    return <div key={key}>
                                            <b className={'text-base md:text-xl text-black font-semibold'}>{key}</b>
                                            <ul className={'list-none list-inside mt-[14px]'}>
                                                {apartmentData?.equipments?.[key]?.map((item) => {
                                                    return <li key={item}
                                                               className={'text-foreground text-sm md:text-lg flex gap-[15px]'}>
                                                        <CheckIcon className={'text-primary min-w-[35px]'}/>
                                                        <span>{item}</span>
                                                    </li>;
                                                })}
                                            </ul>
                                        </div>
                                })
                            }
                        </div>
                        <div className="grid grid-rows-[auto] gap-5">
                            {
                                equipmentsKeys.slice(equipmentsKeys.length / 2).map((key: string) => {
                                    return <div key={key}>
                                            <b className={'text-base md:text-xl text-black font-semibold'}>{key}</b>
                                            <ul className={'list-none list-inside mt-[14px]'}>
                                                {apartmentData?.equipments?.[key]?.map((item) => {
                                                    return <li key={item}
                                                        className={'text-foreground text-sm md:text-lg flex gap-[15px]'}>
                                                        <CheckIcon className={'text-primary min-w-[35px]'}/>
                                                        <span>{item}</span>
                                                    </li>;
                                                })}
                                            </ul>
                                        </div>
                                })
                            }
                        </div>
                    </div>
                </div>}
                <div className={'md:block hidden w-full xl:w-1/3 mt-[40px] md:mt-0'}>
                    {!apartmentData.addons.length ? '' :
                        <div className={'p-[23px] border border-background rounded-lg flex flex-col gap-[18px]'}>
                            {apartmentData.addons.map(apartmentAddon => {
                                const key = `apartment-bool-block-addon-${apartmentAddon.id}-${apartmentId}`;
                                return (
                                    <div key={key}
                                         className={'flex items-center gap-[10px] md:gap-[30px]'}>
                                        <Controller
                                            name={'addons'}
                                            control={control}
                                            render={({field: {onChange, value}}) => {
                                                const isChecked = (value as number[]).includes(apartmentAddon.id);
                                                const setValue = isChecked ? (value as number[]).filter((i: number) => i !== apartmentAddon.id) : [...value, apartmentAddon.id];

                                                return (
                                                    <>
                                                        <Checkbox id={key} checked={isChecked}
                                                                  onClick={() => onChange(setValue)}/>
                                                    </>
                                                )
                                            }}
                                        />
                                        <label htmlFor={key}
                                               className={'text-xs md:text-lg font-medium cursor-pointer'}>
                                    <span
                                        dangerouslySetInnerHTML={{__html: apartmentAddon.title.replace(/^(\+?\d+)/, '<span className="text-primary">$1</span>')}}></span>
                                            <span> (+{apartmentAddon.price})</span>
                                        </label>
                                    </div>
                                )
                            })}
                            {/*<span className={'text-primary'}>+1</span>*/}
                            {/*<div className={'text-lg font-medium'}>*/}
                            {/*    {t('apartment.additionalService.service')} <span className={'text-primary cursor-pointer'}>{t('apartment.additionalService.more')}</span>*/}
                            {/*</div>*/}
                        </div>}

                    {showMap ? (
                        <MapComponent/>
                    ) : ''}
                </div>
            </div>
        </form>
    );
};

export default ApartmentBookBlock;
