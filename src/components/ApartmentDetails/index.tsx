import React, {FC} from 'react';
import UsersIcon from '../icons/users';
import {DownloadIcon, MapPinIcon, Maximize2Icon, Share2Icon, SnowflakeIcon} from 'lucide-react';
import BedIcon from '../icons/bed';
import BathIcon from '../icons/bath';
import {Button} from '../ui/button';
import { useTranslations } from 'next-intl';

interface ApartmentDetailsProps {
    name: string
    maxPeople: number
    bedCount: number
    description: string | undefined
    bathCount: number
    roomSize: number
    price: number
    location: string
    nights: number
    currency: string,
    lat?: number|null,
    lng?: number|null,
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
                                                         lng,
                                                         lat,
                                                     }) => {
    const t = useTranslations('apartmentsDetails')
    return (
        <div className={'w-full bg-white rounded-lg px-[30px] py-[60px]'}>
            <div className={'flex justify-between'}>
                <h1 className={'text-2xl text-black font-semibold'}>{name}</h1>
                <div className={'flex flex-col'}>
                    <b className={'text-2xl text-primary font-extrabold'}>{t('price', {price, currency})}</b>
                    <span className={'text-lg text-foreground-secondary'}>{t('nights', {count: nights})}</span>
                </div>
            </div>
            <div className={'mt-[3px]'}>
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
                    <div
                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                        <BedIcon className={'w-[39px] h-[26px]'}/>
                        <span className={'text-[30px] font-semibold'}>{bedCount}</span>
                    </div>
                    <div
                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                        <BathIcon className={'w-[39px] h-[26px]'}/>
                        <span className={'text-[30px] font-semibold'}>{bathCount}</span>
                    </div>
                    <div
                        className={'inline-flex items-center bg-background gap-[15px] py-[7px] px-[6px] rounded-[5px]'}>
                        <Maximize2Icon className={'h-[23px] w-[23px]'}/>
                        <span className={'text-[30px] font-semibold'}>{roomSize} M2</span>
                    </div>
                </div>
                <div className={'flex gap-[5px]'}>
                    <Button size={'icon'} variant={'ghost'} className={'w-[57px] h-[57px]'}>
                        <DownloadIcon className={'h-[38px] w-[38px] text-primary'}/>
                    </Button>
                    <Button size={'icon'} variant={'ghost'} className={'w-[57px] h-[57px]'}>
                        <Share2Icon className={'h-[38px] w-[38px] text-primary'}/>
                    </Button>
                </div>
            </div>
            {description !== undefined && (
                <div className={'mt-[50px] text-black text-lg font-medium'}
                     dangerouslySetInnerHTML={{__html: description}}/>
            )}
            <div className={'flex flex-wrap mt-[50px] gap-[15px]'}>
            <div
                    className={'flex items-center gap-[15px] px-[20px] py-[15px] rounded-[10px] bg-background'}>
                    <img src={''} alt={''} className={'w-[22px] max-h-[22px]'}/>
                    <span className={'text-lg font-medium text-black'}>Свой бассейн</span>
                </div>
            </div>
        </div>
    );
};

export default ApartmentDetails;
