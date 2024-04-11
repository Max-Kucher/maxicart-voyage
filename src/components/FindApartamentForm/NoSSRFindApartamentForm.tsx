import dynamic from "next/dynamic";
import React from "react";

export const NoSSRFindApartamentForm = dynamic(
    () => import('@/components/FindApartamentForm'),
    {
        ssr: false,
        loading: () => (
            <div className={"bg-white p-[20px] md:py-[30px] md:px-[95px] 2xl:py-[30px] 2xl:px-[40px] flex 2xl:justify-between 2xl:flex-row flex-col rounded-lg md:gap-[20px] gap-[15px]"}></div>
        )
    });

