import React from 'react';

const ServiceCard = () => {
    return (
        <div className={'w-full py-[30px] px-[21px] rounded-xl bg-gray-200'}>
            <div className="flex flex-col gap-[20px] text-center">
                <div></div>
                <h3 className={'font-semibold text-xl'}>Ремонт и клининг</h3>
                <span className={'w-[70px] h-[4px] bg-primary rounded-[5px] mx-auto'}/>
                <p className={'text-lg font-medium'}>
                    Проводится уборка проверка объектов перед
                    и после заезда, а также ремонт при необходимости
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;
