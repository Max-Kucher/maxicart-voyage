import React from 'react';
import Datepicker from "@/components/ui/datepicker";
import {Button} from "@/components/ui/button";
import CountPiker from "@/components/ui/countpiker";
import {Input} from "@/components/ui/input";

const FindApartment = () => {
    return (
            <div className={'2xl:w-[1350px] md:w-[600px] mx-auto'}>
                <div
                    className={'bg-white md:py-[30px] md:px-[95px] 2xl:py-[30px] 2xl:px-[40px] flex 2xl:justify-between 2xl:flex-row flex-col rounded-lg gap-[20px]'}>
                    <div>
                       <span className={'mb-[10px] text-lg'}>
                           Дата
                       </span>
                        <Datepicker/>
                    </div>
                    <div>
                       <span className={'mb-[10px] text-lg'}>
                           Количество людей и комнат
                       </span>
                        <CountPiker/>
                    </div>
                    <div className={'flex items-center gap-[10px]'}>
                        <div>
                           <span className={'mb-[10px] text-lg'}>
                               Цена от
                           </span>
                            <Input type={"number"} rightText={'USD'}/>
                        </div>
                        <div className={'w-[20px] h-[4px] bg-primary rounded-[5px] mt-[6%]'}/>
                        <div>
                            <span className={'mb-[10px] text-lg'}>
                                Цена до
                            </span>
                            <Input type={"number"} rightText={'USD'}/>
                        </div>
                    </div>
                    <div className={'flex items-center justify-center 2xl:hidden'}>
                        <Button className={'inline-block'}>
                            Найти
                        </Button>
                    </div>
                </div>
                <div className={'2xl:flex hidden flex-col mt-[30px] items-end'}>
                    <Button className={'inline-block'}>
                        Найти
                    </Button>
                </div>
            </div>
    );
};

export default FindApartment;
