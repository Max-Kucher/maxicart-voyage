import React from 'react';
import {workStages} from "@/config/workStages";
import WorkStepsCard from "@/components/WorkStepsCard";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import {Link} from "@/navigation";

const WorkStages = () => {
    const t = useTranslations('workStages');
    return (
        <div className="container pb-[60px] pt-[90px] md:py-[100px]">
            <div className={'grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] mx-auto'}>
                <div className={'relative'}>
                    <h2 dangerouslySetInnerHTML={{__html: t('title')}}
                        className={'absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-8/12 lg:w-6/12 md:text-[40px] md:font-extrabold md:text-left font-semibold text-[20px] uppercase text-center'}/>
                </div>
                {
                    workStages.map(({estimationTime, id}, i) =>
                        <WorkStepsCard
                            description={t(`${id}.description`)} title={t(`${id}.title`)}
                            estimatedTime={estimationTime} index={`0${i + 1}`} key={i}
                        />)
                }
            </div>
            <div className="flex md:justify-end md:mt-[60px] mt-[30px] justify-center">
                <Button asChild={true}>
                    <Link href={`#add-apartment-form`}>
                        {t('submit')}
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default WorkStages;
