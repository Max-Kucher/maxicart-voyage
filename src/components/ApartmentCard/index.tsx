import React, {FC} from 'react';
import {MapPinIcon, Maximize2Icon} from "lucide-react";
import {Button} from "@/components/ui/button";
import { cn } from '@/src/lib/utils';
import UsersIcon from "@/components/icons/users";
import BedIcon from "@/components/icons/bed";
import BathIcon from "@/components/icons/bath";
import {Link} from "@/navigation";
import Image from "next/image";
import {useTranslations} from "next-intl";

interface ApartmentCardProps {
    image: string,
    name: string
    maxPeople: number
    bedCount: number
    bathCount: number
    roomSize: number|null
    price: number
    location: string
    nights: number
    currency: string
    link: string | import("url").UrlObject
}

const ApartmentCard: FC<ApartmentCardProps> = ({image, link, currency, bedCount, bathCount, name, nights, price, location, roomSize, maxPeople}) => {
    const t = useTranslations('apartmentCard')
    return (
        <div className={'2xl:w-full bg-white rounded-lg'}>
            <div className={'p-[8px]'}>
                {image === null ? (
                    <img className={'rounded-xl xl:h-[370px] w-full object-cover h-[316px]'} src={`/images/no-photo.png`} alt={"No image"} width={507} height={370} />
                    ) : (
                    <img className={'rounded-xl xl:h-[370px] w-full object-cover h-[316px]'} alt={name} src={image} />
                )}
            </div>
            <div className={'px-[15px] py-[20px] md:p-[30px] md:pt-[22px]'}>
                <b className={'text-base md:text-xl font-semibold'}>
                    {name}
                </b>
                <div className={'mt-[18px] md:mt-[30px]'}>
                    <div className={'flex items-center md:gap-[15px] gap-[10px]'}>
                        <UsersIcon className={'text-primary md:w-[27px] md:h-[27px] w-[20px] h-[20px]'}/>
                        <span className={'text-sm md:text-lg font-medium'}>
                           {t('maxPeople', {maxPeople})}
                        </span>
                    </div>
                </div>
                {(bedCount !== 0 || bathCount !== 0 || roomSize !== null) && (
                    <div className={'flex flex-wrap gap-[15px] mt-[20px] text-foreground-secondary'}>
                        <div
                            className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                            <BedIcon className={'w-[39px] h-[26px]'}/>
                            <span className={'text-base md:text-xl font-semibold'}>{bedCount}</span>
                        </div>
                        {bathCount !== 0 && (
                            <div
                                className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                                <BathIcon className={'w-[39px] h-[26px]'}/>
                                <span className={'text-base md:text-xl font-semibold'}>{bathCount}</span>
                            </div>
                        )}
                        {roomSize !== null && (
                            <div
                                className="inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]">
                                <Maximize2Icon className="h-[23px] w-[23px]"/>
                                <span className="text-base md:text-xl font-semibold">{roomSize} M2</span>
                            </div>
                        )}
                    </div>
                )}

                <div className={'flex items-center gap-[10px] md:gap-[15px] mt-[17px] md:mt-[27px] text-foreground-secondary'}>
                    <MapPinIcon className={'h-[26px] w-[21px]'}/>
                    <span className={'text-sm md:text-lg font-medium'}>{location}</span>
                </div>
                <div className={'flex justify-between items-center mt-[25px] md:mt-[30px]'}>
                    <div className={'flex flex-col'}>
                        <b className={'text-base md:text-2xl font-semibold'}>{t('price', {price, currency})}</b>
                        <span className={'text-sm md:text-lg font-medium text-foreground-secondary'}>{t('nights', {count: nights})}</span>
                    </div>
                    <Link href={link}>
                        <Button className={cn('!min-w-[200px]')}>{t('book')}</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ApartmentCard;
