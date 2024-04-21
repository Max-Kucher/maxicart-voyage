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
                    className={"bg-white p-[20px] md:py-[30px] md:px-[95px] xl:py-[28px] xl:px-[40px] flex xl:justify-between xl:flex-row flex-col rounded-lg md:gap-[20px] gap-[15px] min-h-[157px]"}></div>
                    <div className={'xl:flex hidden flex-col mt-[30px] items-end'}>
                        <Btn />
                    </div>
            </>
        ))
    });

