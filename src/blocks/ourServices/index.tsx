import React from 'react';
import {services} from "@/config/service";
import ServiceCard from "@/components/ServiceCard";
import {useTranslations} from "next-intl";

const OurWork = ({ ...props }) => {
    const t = useTranslations('service');

    return (
        <div {...props} className={'2xl:py-[100px] xl:pt-[150px] xl:pb-[60px]'}>
            <div className="container">
                <div
                    className={'grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] 2xl:w-[1075px] md:w-full md:max-w-[705px] 2xl:max-w-full w-[320px] mx-auto'}>
                    <div className={'relative w-full md:h-auto mb-[20px] md:mb-0'}>
                        <h2 dangerouslySetInnerHTML={{__html: t('title')}}
                            className={'md:w-6/12 md:text-[40px] md:font-extrabold text-center md:text-left font-semibold w-full text-[20px] uppercase absolute top-[50%] translate-y-[-50%] mb-20px'}/>
                    </div>
                    {
                        services.map(({textKey}, i) => (
                            <ServiceCard
                                title={t(`${textKey}.title`)}
                                image={`/images/services/${textKey}.svg`}
                                description={t(`${textKey}.description`)}
                                key={i}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default OurWork;
