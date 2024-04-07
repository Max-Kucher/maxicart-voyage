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
        <div className={'px-[20px] pt-[20px] pb-[30px] bg-background rounded-xl flex flex-col gap-[11px]'}>
            <div className={'flex justify-between items-start'}>
                <h3 className={'text-5xl font-extrabold text-primary pt-[10px]'}>{index}</h3>
                <div className={'bg-white text-[#808080] inline-block p-[5px] rounded-lg font-medium'}>
                    {estimatedTime} {t('days')}
                </div>
            </div>
            <b className={'text-xl text-primary font-semibold'}>
                {title}
            </b>
            <p className={'text-lg text-black font-medium'}>
                {description}
            </p>
        </div>
    );
};

export default WorkStepsCard;
