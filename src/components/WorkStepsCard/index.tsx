import React, {FC} from 'react';
import {useTranslations} from "next-intl";

interface WorkStepsCardProps {
    index: string
    title: string
    description: string
    estimatedTime: string
}
const WorkStepsCard: FC<WorkStepsCardProps> = ({index, title, description, estimatedTime}) => {
    const t = useTranslations('workStages');

    return (
        <div className={'group px-[20px] md:pt-[20px] md:pb-[30px] py-[30px] bg-background rounded-xl flex flex-col gap-[11px] hover:bg-primary transition'}>
            <div className={'flex justify-between items-start'}>
                <h3 className={'text-[30px] md:text-5xl font-extrabold text-primary md:pt-[10px] group-hover:text-white transition'}>{index}</h3>
                <div className={'bg-white text-[#808080] inline-block p-[5px] md:text-lg text-sm rounded-lg font-medium'}>
                    {estimatedTime} {t('days')}
                </div>
            </div>
            <b className={'text-base md:text-xl text-primary font-semibold group-hover:text-white transition'}>
                {title}
            </b>
            <p className={'text-sm md:text-lg text-black font-medium group-hover:text-white transition'}>
                {description}
            </p>
        </div>
    );
};

export default WorkStepsCard;
