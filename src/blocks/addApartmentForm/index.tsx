'use client'
import React, {FC} from 'react';

import { useTranslations } from 'next-intl';
import AddApartmentForm from '@/src/components/AddApartmentForm';
import {cn} from "@/lib/utils";

interface AddApartmentFormBlockProps {
    id?: string; // Block identifier
    isTextCentered?: boolean;
    imageBg?: boolean;
}

const AddApartmentFormBlock: FC<AddApartmentFormBlockProps> = ({ id, isTextCentered, imageBg }) => {
    const t = useTranslations('addApartmentForm');
    const blockBgClass = imageBg
                                                        ? 'bg-main bg-[length:100%_870px] md:bg-[length:100%_950px] bg-top bg-fixed bg-no-repeat'
                                                        : 'xl:bg-background';

    return (
        <div id={id ?? 'add-apartment-form'} className={`${blockBgClass} xl:pb-[80px] xl:pt-[100px] md:pb-[60px] pb-[50px] pt-[65px]`}>
            <div className={'container'}>
                <div className={cn('flex flex-wrap xl:flex-nowrap xl:px-[62px] xl:py-[60px] xl:gap-[80px] xl:w-[1075px] md:py-[60px] md:px-[50px] p-[22px] mx-auto bg-white rounded-lg', {'xl:items-center': isTextCentered})}>
                    <div className={'w-10/12 flex flex-col xl:gap-[24px] gap-[22px] xl:text-left md:text-center text-left md:mx-auto xl:mx-0 md:gap-[15px] mb-[30px] xl:mb-0'}>
                        <h2 className={'md:text-[30px] text-xl xs:text-[27px] xl:text-3xl uppercase font-semibold'}>
                            {t('title')}
                        </h2>
                        <b className={'text-lg md:text-xl font-semibold'}>{t('subtitle')}</b>
                        <p className={'text-base md:text-lg font-medium'}>
                            {t('description')}
                        </p>
                    </div>
                    <AddApartmentForm/>
                </div>
            </div>
        </div>
    );
};

export default AddApartmentFormBlock;
