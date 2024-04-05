import React from 'react';
import {cn} from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {UserRoundIcon, Minus, Plus} from "lucide-react";

const CountPiker = ({className}: { className?: string }) => {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "md:justify-start justify-center text-left font-normal p-[14px] md:p-[20px] h-auto",
                        )}
                    >
                        {/*TODO download icon and change*/}
                        <UserRoundIcon className="mr-2 h-[27px] w-[27px] text-primary"/>
                        <span className={'inline-block text-sm md:px-[0.6em] md:text-lg'}>
                            22 человек - 22 детей- 2 комнаты
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    <div
                        className={'md:px-[34px] md:py-[41px] px-[10px] py-[20px] bg-white rounded-xl w-full flex flex-col gap-[40px]'}>
                        <div className={'text-lg items-center flex justify-between  gap-[38vw] md:gap-[183px]'}>
                            <span>Комнат</span>
                            <div className={'flex items-center gap-[20px]'}>
                                <Minus className={'text-primary cursor-pointer'}/>
                                <div>2</div>
                                <Plus className={'text-primary cursor-pointer'}/>
                            </div>
                        </div>
                        <div className={'text-lg items-center flex justify-between gap-[38vw] md:gap-[183px]'}>
                            <span>Комнат</span>
                            <div className={'flex items-center gap-[20px]'}>
                                <Minus className={'text-primary cursor-pointer'}/>
                                <div>2</div>
                                <Plus className={'text-primary cursor-pointer'}/>
                            </div>
                        </div>
                        <div className={'text-lg items-center flex justify-between gap-[38vw] md:gap-[183px]'}>
                            <span>Комнат</span>
                            <div className={'flex items-center gap-[20px]'}>
                                <Minus className={'text-primary cursor-pointer'}/>
                                <div>2</div>
                                <Plus className={'text-primary cursor-pointer'}/>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default CountPiker;
