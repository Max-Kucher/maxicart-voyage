import dynamic from "next/dynamic";
import React from "react";

export const NoSSRApartmentBookBlock = dynamic(
    () => import('@/components/ApartmentBookBlock'),
    {
        ssr: false,
        loading: () => (<div className={"bg-white rounded-lg px-[30px] py-[60px] mt-[30px]"}></div>)
    });

