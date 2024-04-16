import PageNavigation from "@/components/PageNavigation";
import React from "react";
import UsersIcon from "@/components/icons/users";
import {MapPinIcon, Maximize2Icon} from "lucide-react";
import BedIcon from "@/components/icons/bed";
import BathIcon from "@/components/icons/bath";
import useApartments from "@/composables/useApartments";
import {getTranslations} from "next-intl/server";
import usePayments from "@/composables/usePayments";
import {convertSearchApartmentsFormDataToApartmentsSearchParams} from "@/lib/utils";
import SearchApartmentsFormData from "@/types/SearchApartmentsFormData";
import {format} from "date-fns";
import CreatePaymentRequestResult from "@/types/CreatePaymentRequestResult";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import {useLocale} from "next-intl";
import {enUS, ru} from "date-fns/locale";

interface RentPageProps {
    apartment: number,
}

export default async function RentIndex({searchParams, params: {apartment: apartmentId}}: {
    params: RentPageProps,
    searchParams: {
        bookData: string
    }
}) {
    const lng = useLocale()
    const pikerLng = {
        ru,
        en: enUS
    }[lng];

    const { searchApartmentById, checkApartment } = useApartments();
    const { body: apartmentData } = await searchApartmentById(apartmentId);

    const paramsString: string = searchParams?.bookData?.length ? atob(searchParams.bookData) : '{}';
    const selectedData: SearchApartmentsFormData = JSON.parse(paramsString.trim())

    if (!selectedData.date) {
        const today = new Date();
        selectedData.date = {
            from: new Date(today.setDate(today.getDate() + 1)),
            to: new Date(today.setDate(today.getDate() + 2)),
        };
    }

    if (!selectedData.general) {
        selectedData.general = {
            adult: 1,
        };
    }
    const apartmentSearch = convertSearchApartmentsFormDataToApartmentsSearchParams(selectedData);
    const checkResult = await checkApartment(apartmentId, apartmentSearch)
    const selectedAddons = apartmentData?.addons?.filter(item => selectedData?.addons?.includes(item.id))
    const fullPrice = selectedAddons.reduce((acc, item) => +item?.price + acc, 0) + checkResult?.body?.smoobu?.price

    const t = await getTranslations();

    const {createPayment} = usePayments();
    let paymentData: CreatePaymentRequestResult = {};

    if (checkResult.ok) {
        paymentData = await createPayment({
            apartment_id: parseInt(apartmentId.toString()),
            arrival_date: apartmentSearch.arrival_date?.toString() ?? '',
            departure_date: apartmentSearch.departure_date?.toString() ?? '',
            addons: selectedData?.addons ?? [],
        });
    }

    return (<main>
        <div className="container">
            <div className={'mt-[20px] md:mt-[40px] 2xl:mt-[70px] md:mb-[30px] mb-[20px]'}>
                <PageNavigation nameSpace={apartmentData.title ?? apartmentData.smoobu.name}/>
            </div>
            <div className={'grid grid-cols-1 xl:grid-cols-3 gap-y-[20px] xl:gap-[20px]'}>
                <div className={'bg-white rounded-xl p-[20px] xl:py-[60px] xl:px-[30px] col-span-1'}>
                    <b className={'text-lg xl:text-xl font-semibold block text-center'}>{t("checkout.details.blockTitle")}</b>
                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-y-[10px] md:gap-x-[10px] xl:block mt-[30px] xl:mt-0'}>
                        <div className={'p-[10px] xl:p-[20px] border border-[#D6D6D6] rounded-xl xl:mt-[30px]'}>
                            <b className={'text-lg xl:text-xl text-center xl:text-left'}>{apartmentData.title ?? apartmentData.smoobu.name}</b>
                            <div className={'mt-[20px]'}>
                                <div className={'flex items-center gap-[15px]'}>
                                    <UsersIcon className={'text-primary w-[27px] h-[27px]'}/>
                                    <span className={'text-lg font-medium text-foreground'}>
                                        {t('apartmentCard.maxPeople', {maxPeople: apartmentData.smoobu.rooms.maxOccupancy})}
                                </span>
                                </div>
                            </div>
                            <div className={'flex items-center gap-[15px] mt-[10px] text-foreground-secondary'}>
                                <MapPinIcon className={'h-[30px] w-[26px]'}/>
                                <span className={'text-lg font-medium'}>{apartmentData.address}</span>
                            </div>
                            <div className={'flex justify-between'}>
                                <div className={'flex flex-wrap gap-[15px] mt-[20px] text-foreground-secondary'}>
                                    {apartmentData.smoobu.rooms.bedrooms > 0 && (<div
                                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                                        <BedIcon className={'w-[39px] h-[26px]'}/>
                                        <span
                                            className={'text-lg font-semibold'}>{apartmentData.smoobu.rooms.bedrooms}</span>
                                    </div>)}
                                    {apartmentData.smoobu.rooms.bathrooms > 0 && (<div
                                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                                        <BathIcon className={'w-[39px] h-[26px]'}/>
                                        <span
                                            className={'text-lg font-semibold'}>{apartmentData.smoobu.rooms.bathrooms}</span>
                                    </div>)}
                                    {(apartmentData.m2 ?? 0) > 0 && (<div
                                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                                        <Maximize2Icon className={'h-[23px] w-[23px]'}/>
                                        <span className={'text-lg font-semibold'}>{apartmentData.m2} M2</span>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                        <div className={'my-auto h-full flex items-center p-[10px] xl:p-[20px] border border-[#D6D6D6] rounded-xl xl:hidden justify-between'}>
                            <div>
                                <b className={'block text-lg xl:text-xl font-semibold'}>{t('checkout.details.arrivalDate')}</b>
                                <span className={'text-base xl:text-lg'}>{format(selectedData.date.from, 'EE, dd MMMM yyyy', {locale: pikerLng})}</span>
                            </div>
                            <div className={'bg-foreground h-[70%] w-[1px] my-auto mx-3'}/>
                            <div>
                                <b className={'block text-lg xl:text-xl font-semibold'}>{t('checkout.details.departureDate')}</b>
                                <span className={'text-base xl:text-lg'}>{format(selectedData.date.to, 'EE, dd MMMM yyyy', {locale: pikerLng})}</span>
                            </div>
                        </div>
                    </div>
                    <b className={'block text-lg xl:text-xl font-semibold mt-[48px]'}>{t('checkout.details.stayLength')}</b>
                    <b className={'block text-lg xl:text-xl font-semibold text-primary'}>{t('apartmentsDetails.nights', {
                        count: Math.floor((new Date(selectedData.date.to).getTime() - new Date(selectedData.date.from).getTime()) / (1000 * 60 * 60 * 24)),
                    })}</b>
                    <div className={'hidden p-[20px] border border-[#D6D6D6] rounded-xl mt-[30px] xl:flex justify-between'}>
                        <div>
                            <b className={'block text-lg xl:text-xl font-semibold'}>{t('checkout.details.arrivalDate')}</b>
                            <span className={'text-base xl:text-lg'}>{format(selectedData.date.from, 'EE, dd MMMM yyyy', {locale: pikerLng})}</span>
                        </div>
                        <div className={'bg-foreground h-full w-[1px]'}/>
                        <div>
                            <b className={'block text-lg xl:text-xl font-semibold'}>{t('checkout.details.departureDate')}</b>
                            <span className={'text-base xl:text-lg'}>{format(selectedData.date.to, 'EE, dd MMMM yyyy', {locale: pikerLng})}</span>
                        </div>
                    </div>
                    {!!selectedData.addons?.length &&
                        <>
                            <b className={'block text-lg xl:text-xl font-semibold mt-[40px] text-center xl:text-left'}>{t('checkout.details.additionalServices')}</b>
                            <div className={'flex justify-center xl:block'}>
                                <div
                                    className={'p-[20px] border border-[#D6D6D6] rounded-xl mt-[20px] xl:flex flex-col gap-[10px] inline-flex mx-auto'}>
                                    {selectedAddons.map((item) => {
                                        return <div className={'text-lg'} key={item.id}>
                                    <span
                                        dangerouslySetInnerHTML={{__html: item.title.replace(/^(\+?\d+)/, '<span class="text-primary">$1</span>')}}></span>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </>
                        }
                        <p className={'text-sm xl:text-base mt-[40px] text-foreground-secondary'}>
                            {t('checkout.details.description')}
                        </p>
                        <div className={'mt-[40px] flex justify-between'}>
                            <b className={'block text-xl font-semibold'}>{t('checkout.details.price')}</b>
                            <div>
                                <div
                                    className={'text-xl xl:text-[25px] text-primary font-extrabold'}>{fullPrice ?? 0} USD
                                </div>
                                <div className={'text-base xl:text-lg font-medium'}>{t('checkout.details.nightsAndDays', {
                                    nights: Math.floor((new Date(selectedData.date.to).getTime() - new Date(selectedData.date.from).getTime()) / (1000 * 60 * 60 * 24)),
                                    days: Math.floor((new Date(selectedData.date.to).getTime() - new Date(selectedData.date.from).getTime()) / (1000 * 60 * 60 * 24) + 1),
                                })}
                                </div>
                            </div>
                        </div>
                        </div>

                    {checkResult.ok ?
                        (
                        <CheckoutForm availabilityData={{
                        isAvailable: checkResult.ok,
                        errorMessage: checkResult?.body?.message ?? ''
                    }}
                     apartmentData={apartmentData}
                     stripeClientSecret={paymentData.body?.client_secret ?? ''}
                     price={fullPrice ?? 0}
                />
                )
                : (
                <div className={'bg-white rounded-xl px-[80px] py-[60px] col-span-2'}>
                    <div
                        className="flex p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <div>
                            <span className="font-medium">{checkResult?.body?.message}</span>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    </main>
)
};
