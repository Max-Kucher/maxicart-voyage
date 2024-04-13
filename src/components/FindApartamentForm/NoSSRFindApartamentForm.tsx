import dynamic from "next/dynamic";
import React from "react";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";

const Btn = () => {
    const t = useTranslations();

    return (<Button className={`inline-block transition-opacity duration-150 hover:opacity-90`}>
        {t('filterForm.find')}
    </Button>);
}

export const NoSSRFindApartamentForm = dynamic(
    () => import('@/components/FindApartamentForm'),
    {
        ssr: false,
        loading: (() => (<>
                <div
                    className={"bg-white p-[20px] md:py-[30px] md:px-[95px] 2xl:py-[30px] 2xl:px-[40px] flex 2xl:justify-between 2xl:flex-row flex-col rounded-lg md:gap-[20px] gap-[15px] min-h-[157px]"}></div>
                    <div className={'2xl:flex hidden flex-col mt-[30px] items-end'}>
                        <Btn />
                    </div>
            </>
        ))
    });

