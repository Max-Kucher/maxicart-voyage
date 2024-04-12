'use client';
import React, {FC, useContext} from 'react';
import UsersIcon from '../icons/users';
import {DownloadIcon, MapPinIcon, Maximize2Icon} from 'lucide-react';
import BedIcon from '../icons/bed';
import BathIcon from '../icons/bath';
import {Button} from '../ui/button';
import {useTranslations} from 'next-intl';
import {Link} from "@/navigation";
import Amenity from "@/types/Amenity";
import ApartmentAddon from "@/types/ApartmentAddon";
import Image from "next/image";
import {ApartmentContext} from "@/components/ApratmentProvider";

interface ApartmentDetailsProps {
    name: string;
    maxPeople: number;
    bedCount: number;
    description?: string;
    bathCount: number;
    roomSize: number;
    price: number;
    location: string;
    nights: number;
    currency: string;
    document?: string;
    amenities?: Amenity[];
    addons?: ApartmentAddon[];
    lat?: number | null;
    lng?: number | null;
}

const ApartmentDetails: FC<ApartmentDetailsProps> = ({
                                                         name,
                                                         maxPeople,
                                                         bedCount,
                                                         bathCount,
                                                         roomSize,
                                                         price,
                                                         location,
                                                         nights,
                                                         description,
                                                         currency,
                                                         document,
                                                         amenities,
                                                         addons,
                                                         lng,
                                                         lat,
                                                     }) => {
    const apartmentContext: any = useContext(ApartmentContext)
    const t = useTranslations('apartmentsDetails')
    return (
        <div className={'w-full bg-white rounded-lg xl:px-[30px] xl:py-[60px] py-[30px] px-[20px]'}>
            <div className={'flex justify-between'}>
                <div className={'flex md:justify-between md:w-full flex-col md:flex-row gap-[20px] md:gap-[0px]'}>
                    <h1 className={'text-lg md:text-2xl text-black font-semibold'}>{name}</h1>
                    <div className={'flex flex-col'}>
                        <b className={'text-lg md:text-2xl text-primary font-extrabold'}>{t('price', {price: apartmentContext.apartmentPrice ?? price, currency})}</b>
                        <span className={'text-sm md:text-lg text-foreground-secondary'}>{t('nights', {count:  apartmentContext.apartmentNights ?? nights})}</span>
                    </div>
                </div>
                <div className={'md:hidden flex flex-col gap-[10px]'}>
                    {document && <Link href={document} target={'_blank'}>
                        <Button size={'icon'} variant={'ghost'} className={'w-[44px] h-[44px] md:w-[57px] md:h-[57px]'}>
                            <DownloadIcon className={'w-[30px] h-[30px] md:h-[38px] md:w-[38px] text-primary'}/>
                        </Button>
                    </Link>}
                    {/*<Button size={'icon'} variant={'ghost'} className={'w-[44px] h-[44px] md:w-[57px] md:h-[57px]'}>*/}
                    {/*    <Share2Icon className={'w-[30px] h-[30px] md:h-[38px] md:w-[38px] text-primary'}/>*/}
                    {/*</Button>*/}
                </div>
            </div>
            <div className={'mt-[20px] md:mt-[3px]'}>
                <div className={'flex items-center gap-[15px]'}>
                    <UsersIcon className={'text-primary w-[27px] h-[27px]'}/>
                    <span className={'text-lg font-medium text-foreground'}>
                        {t('maxPeople', {maxPeople})}
                    </span>
                </div>
            </div>
            <div className={'flex items-center gap-[15px] mt-[10px] text-foreground-secondary'}>
                <MapPinIcon className={'h-[26px] w-[21px]'}/>
                <span className={'text-lg font-medium'}>{location}</span>
            </div>
            <div className={'flex justify-between'}>
                <div className={'flex flex-wrap gap-[15px] mt-[20px] text-foreground-secondary'}>
                    {bedCount ? (<div
                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                        <BedIcon className={'w-[39px] h-[26px]'}/>
                        <span className={'text-lg font-medium md:text-[30px] md:font-semibold'}>{bedCount}</span>
                    </div>) : ''}
                    {bathCount ? (
                        <div
                            className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                            <BathIcon className={'w-[39px] h-[26px]'}/>
                            <span className={'text-lg font-medium md:text-[30px] md:font-semibold'}>{bathCount}</span>
                        </div>
                    ) : ''}
                    {roomSize ? (<div
                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                        <Maximize2Icon className={'h-[23px] w-[23px]'}/>
                        <span className={'text-lg font-medium md:text-[30px] md:font-semibold'}>{roomSize} M2</span>
                    </div>) : ''}
                </div>
                <div className={'hidden md:flex gap-[5px]'}>
                    {document ? <Link href={document} target={'_blank'}>
                        <Button size={'icon'} variant={'ghost'} className={'w-[57px] h-[57px]'}>
                            <DownloadIcon className={'h-[38px] w-[38px] text-primary'}/>
                        </Button>
                    </Link> : ''}
                    {/*<Button size={'icon'} variant={'ghost'} className={'w-[57px] h-[57px]'}>*/}
                    {/*    <Share2Icon className={'h-[38px] w-[38px] text-primary'}/>*/}
                    {/*</Button>*/}
                </div>
            </div>
            {description === undefined ? '' : (
                <div className={'mt-[20px] md:mt-[50px] text-black text-sm md:text-lg font-medium'}
                     dangerouslySetInnerHTML={{__html: description}}/>
            )}
            <div className={'flex flex-wrap mt-[20px] md:mt-[50px] gap-[15px]'}>
                {amenities === undefined ? '' : amenities.map(amenity => {
                    return (<div key={`apartment-details-amenity-${amenity.id}`}
                        className={'flex items-center gap-[15px] px-[20px] py-[15px] rounded-[10px] bg-background'}
                    >
                        {amenity.icon !== undefined && (
                            <Image src={amenity.icon} width={0} height={0} style={{ width: 'auto', height: 'auto' }} alt={amenity.title} />
                        )}
                        <span className={'text-sm md:text-lg font-medium text-black'}>
                            {amenity.title}
                        </span>
                    </div>);
                })}

            </div>
        </div>
    );
};

export default ApartmentDetails;
