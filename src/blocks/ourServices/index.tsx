import React from 'react';
import {services} from "@/config/service";
import ServiceCard from "@/components/ServiceCard";
import {useTranslations} from "next-intl";

const OurWork = ({ ...props }) => {
    const t = useTranslations('service');

    return (
        <div {...props} className={'xl:py-[100px] xl:pt-[150px] xl:pb-[60px] md:pb-0 pb-[30px]'}>
            <div className="container">
                <div
                    className={'grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] xl:w-[1075px] md:w-full md:max-w-[705px] xl:max-w-full w-[320px] mx-auto'}>
                    <div className={'relative w-full md:h-auto'}>
                        <h2 dangerouslySetInnerHTML={{__html: t('title')}}
                            className={'md:w-6/12 md:text-[40px] md:font-extrabold text-center md:text-left font-semibold w-full text-[20px] uppercase md:absolute top-[50%] md:mt-0 mt-[30px] md:translate-y-[-50%] mb-20px'}/>
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
