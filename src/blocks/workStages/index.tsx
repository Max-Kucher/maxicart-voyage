import React from 'react';
import {workStages} from "@/config/workStages";
import WorkStepsCard from "@/components/WorkStepsCard";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";

const WorkStages = () => {
    const t = useTranslations('workStages');
    return (
        <div className="container py-[100px]">
            <div className={'grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] mx-auto'}>
                <div className={'relative'}>
                    <h2 dangerouslySetInnerHTML={{__html: t('title')}}
                        className={'absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-8/12 lg:w-6/12 md:text-[40px] md:font-extrabold text-left font-semibold text-[20px] uppercase'}/>
                </div>
                {
                    workStages.map(({estimationTime, id}, i) => <WorkStepsCard
                        description={t(`${id}.description`)} title={t(`${id}.title`)}
                        estimatedTime={estimationTime} index={`0${i + 1}`} key={i}/>)
                }
            </div>
            <div className="flex justify-end mt-[60px]">
                <Button>
                    {t('submit')}
                </Button>
            </div>
        </div>
    );
};

export default WorkStages;
