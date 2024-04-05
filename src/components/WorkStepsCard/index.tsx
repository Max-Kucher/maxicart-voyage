import React from 'react';

const WorkStepsCard = () => {
    return (
        <div className={'px-[20px] pt-[20px] pb-[30px] bg-background rounded-xl flex flex-col gap-[11px]'}>
            <div className={'flex justify-between items-start'}>
                <h3 className={'text-5xl font-extrabold text-primary pt-[10px]'}>01</h3>
                <div className={'bg-white text-[#808080] inline-block p-[5px] rounded-lg font-medium'}>
                    11-33 days
                </div>
            </div>
            <div className={'text-xl text-primary font-semibold'}>
                Подготовка
            </div>
            <p className={'text-lg text-black font-medium'}>
                Профессиональная фотосессия жилья
                и комплексная уборка, чтобы вы могли предложить гостям идеальное проживание.
            </p>
        </div>
    );
};

export default WorkStepsCard;
