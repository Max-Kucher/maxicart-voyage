import PageNavigation from "@/components/PageNavigation";
import React from "react";
import UsersIcon from "@/components/icons/users";
import {MapPinIcon, Maximize2Icon} from "lucide-react";
import BedIcon from "@/components/icons/bed";
import BathIcon from "@/components/icons/bath";
import useApartments from "@/composables/useApartments";
import {getTranslations} from "next-intl/server";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import usePayments from "@/composables/usePayments";
import { cookies } from "next/headers";
import appConfig from "@/config/app";
import ApartmentsSearchResult from "@/types/ApartmentsSearchResult";
import {convertDateToSearch} from "@/lib/utils";

interface RentPageProps {
    apartment: number,
}

export default async function RentIndex({ params: { apartment: apartmentId } }: {
    params: RentPageProps
}) {
    const cookieStore = cookies();
    const { searchApartmentById } = useApartments();
    const { body: apartmentData } = await searchApartmentById(apartmentId);

    const t = await getTranslations();

    const savedCheckoutData = {
        frontEndData: cookieStore.get(appConfig.cookieKeys.checkoutData),
        backEndData: cookieStore.get(`${appConfig.cookieKeys.checkoutData}-backend`),
    };

    if (savedCheckoutData?.frontEndData !== undefined) {
        savedCheckoutData.frontEndData = JSON.parse(savedCheckoutData.frontEndData.value);
    }
    if (savedCheckoutData?.backEndData !== undefined) {
        savedCheckoutData.backEndData = JSON.parse(savedCheckoutData.backEndData.value);
    }

    const { createPayment } = usePayments();
    const today = new Date().getDate();

    const paymentData = await createPayment({
        apartment_id: parseInt(apartmentId.toString()),
        // @ts-ignore
        arrival_date: savedCheckoutData?.backEndData?.arrival_date ?? convertDateToSearch(new Date(today + 1)),
        // @ts-ignore
        departure_date: savedCheckoutData?.backEndData?.departure_date ?? convertDateToSearch(new Date(today + 3)),
        addons: [],
    });

    console.log(paymentData);

    return (<main>
            <div className="container">
                <div className={'mt-[20px] md:mt-[40px] 2xl:mt-[70px] md:mb-[30px] mb-[20px]'}>
                    <PageNavigation nameSpace={apartmentData.title ?? apartmentData.smoobu.name} />
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
                                        {t('apartmentCard.maxPeople', {maxPeople: 2})}
                                    </span>
                                </div>
                            </div>
                            <div className={'flex items-center gap-[15px] mt-[10px] text-foreground-secondary'}>
                                <MapPinIcon className={'h-[30px] w-[26px]'}/>
                                <span className={'text-lg font-medium'}>{apartmentData.address}</span>
                            </div>
                            <div className={'flex justify-between'}>
                                <div className={'flex flex-wrap gap-[15px] mt-[20px] text-foreground-secondary'}>

                                    {apartmentData.smoobu.rooms.bedrooms > 0 && (<div className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                                        <BedIcon className={'w-[39px] h-[26px]'}/>
                                        <span className={'text-lg font-semibold'}>{apartmentData.smoobu.rooms.bedrooms}</span>
                                    </div>)}
                                    {apartmentData.smoobu.rooms.bathrooms > 0 && (<div
                                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                                        <BathIcon className={'w-[39px] h-[26px]'}/>
                                        <span className={'text-lg font-semibold'}>{apartmentData.smoobu.rooms.bathrooms}</span>
                                    </div>)}
                                    {(apartmentData.m2 ?? 0) > 0 && (<div
                                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                                        <Maximize2Icon className={'h-[23px] w-[23px]'}/>
                                        <span className={'text-lg font-semibold'}>{ apartmentData.m2 } M2</span>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <CheckoutForm apartmentData={apartmentData} />
                </div>
            </div>
        </main>
    )
};
