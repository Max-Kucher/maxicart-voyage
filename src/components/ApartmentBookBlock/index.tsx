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
import useApartments from "@/composables/useApartments";
import {Link, useRouter} from "@/src/navigation";
import Apartment from "@/types/Apartment";
import {ApartmentContext} from "@/components/ApratmentProvider";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

import markerIconX2 from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import 'leaflet/dist/leaflet.css';
import {LatLngExpression} from "leaflet";
import {AppContext} from "@/components/AppContext";
import {setCookie} from "cookies-next";
import { add } from 'date-fns';
import LoadingSpinner from "@/components/ui/loadingSpinner";

interface ApartmentBookBlockProps {
    apartmentData: Apartment,
}

const ApartmentBookBlock = ({apartmentData}: ApartmentBookBlockProps) => {
    const apartmentId = apartmentData.id;
    const {checkApartment} = useApartments();
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
                room: 1,
                adult: 1,
                child: formData?.general?.child ?? 0,
            },
            addons: []
        },
    })

    const [general, date]= useWatch({control, name: ['general', 'date']})

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
    const latLngPositions: LatLngExpression = [apartmentData?.smoobu?.location?.latitude ?? 50, apartmentData?.smoobu?.location?.longitude ?? 50];

    React.useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIconX2.src,
            iconUrl: markerIcon.src,
            shadowUrl: markerShadow.src
        });
    }, []);

    const Map = () => (
        <MapContainer className={`h-[246px] mt-[30px] rounded-[10px]`} center={latLngPositions} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={latLngPositions}>
                <Popup>{ apartmentData.address }</Popup>
            </Marker>
        </MapContainer>
    )

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
                <Button disabled={formLoading}>
                    {formLoading ? (<LoadingSpinner className={`w-8 h-8`} />) : t('apartment.additionalService.apply')}
                </Button>
                {!!apartmentData.addons.length && <div className={'md:hidden block w-full xl:w-1/3 my-[40px] md:mt-0'}>
                    <div className={'p-[23px] border border-foreground-secondary rounded-lg flex flex-col gap-[18px]'}>
                        {apartmentData.addons.map(apartmentAddon => {
                            const key = `apartment-bool-block-mobile-addon-${apartmentAddon.id}-${apartmentId}`;

                            return (<div key={key} className={'flex items-center gap-[10px] md:gap-[30px]'}>
                                <Checkbox id={key}/>
                                <label htmlFor={key} className={'text-xs md:text-lg font-medium'}>
                                    <span dangerouslySetInnerHTML={
                                        {__html: apartmentAddon.title.replace(/^(\+?\d+)/, '<span class="text-primary">$1</span>')}
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
                        {formLoading || bookPageMoving ? (<LoadingSpinner className={`w-8 h-8`} />) : t('apartment.additionalService.book')}
                    </Link>
                </Button>
                <div className={'md:hidden block w-full h-[250px] z-0'}>
                    <Map/>
                </div>
            </div>
            <div className={'flex mt-[60px] md:justify-between md:flex-row flex-col'}>
                <div>
                    {/*<b className={'text-base md:text-xl text-black font-semibold'}>Удобства и услуги</b>*/}
                    {/*<div className={'grid md:grid-cols-2 grid-cols-1 gap-x-[100px] mt-[30px]'}>*/}
                    {/*    <div>*/}
                    {/*        <b className={'text-base md:text-xl text-black font-semibold'}>Ванная комната</b>*/}
                    {/*        <ul className={'list-none list-inside mt-[14px]'}>*/}
                    {/*            <li className={'text-foreground text-sm md:text-lg flex gap-[15px]'}>*/}
                    {/*                <CheckIcon className={'text-primary'}/>*/}
                    {/*                <span>Ванная комната</span>*/}
                    {/*            </li>*/}
                    {/*            <li className={'text-foreground text-sm md:text-lg flex gap-[15px]'}>*/}
                    {/*                <CheckIcon className={'text-primary'}/>*/}
                    {/*                <span>Ванная комната</span>*/}
                    {/*            </li>*/}
                    {/*            <li className={'text-foreground text-sm md:text-lg flex gap-[15px]'}>*/}
                    {/*                <CheckIcon className={'text-primary'}/>*/}
                    {/*                <span>Ванная комната</span>*/}
                    {/*            </li>*/}
                    {/*            <li className={'text-foreground text-sm md:text-lg flex gap-[15px]'}>*/}
                    {/*                <CheckIcon className={'text-primary'}/>*/}
                    {/*                <span>Ванная комната</span>*/}
                    {/*            </li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className={'md:block hidden w-full xl:w-1/3 mt-[40px] md:mt-0'}>
                    {!apartmentData.addons ? '' : <div className={'p-[23px] border border-background rounded-lg flex flex-col gap-[18px]'}>
                        {apartmentData.addons.map(apartmentAddon => {
                            const key = `apartment-bool-block-addon-${apartmentAddon.id}-${apartmentId}`;
                            return (
                            <div key={key}
                                 className={'flex items-center gap-[10px] md:gap-[30px]'}>
                                <Controller
                                    name={'addons'}
                                    control={control}
                                    render={({field: {onChange, value }}) => {
                                        const isChecked = (value as number[]).includes(apartmentAddon.id);
                                        const setValue = isChecked ? (value as number[]).filter((i: number) => i !== apartmentAddon.id) : [...value, apartmentAddon.id];

                                        return (
                                            <>
                                                <Checkbox id={key} checked={isChecked} onClick={() => onChange(setValue)}/>
                                            </>
                                        )
                                    }}
                                />
                                <label htmlFor={key} className={'text-xs md:text-lg font-medium cursor-pointer'}>
                                    <span
                                        dangerouslySetInnerHTML={{__html: apartmentAddon.title.replace(/^(\+?\d+)/, '<span class="text-primary">$1</span>')}}></span>
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
                        <Map/>
                    ) : ''}
                </div>
            </div>
        </form>
    );
};

export default ApartmentBookBlock;
