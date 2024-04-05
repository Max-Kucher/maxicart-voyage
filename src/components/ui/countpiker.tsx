import React, {FC} from 'react';
import {cn} from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {UserRoundIcon, Minus, Plus} from "lucide-react";


interface CountPikerProps {
    className?: string,
    list: { label: string, id: string, min?: number, max?: number }[]
    values: { [id: string]: number }
    text?: string
    onSetValue: (id: string, value: number) => void
}

const CountPiker: FC<CountPikerProps> = ({className, text, onSetValue, values, list}) => {
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
                        <UserRoundIcon className="mr-2 h-[27px] w-[27px] text-primary"/>
                        <span className={'inline-block text-sm md:px-[0.6em] md:text-lg text-[#5F5F5F]'}>
                           {text}
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    <div
                        className={'md:px-[34px] md:py-[41px] px-[10px] py-[20px] bg-white rounded-xl w-full flex flex-col gap-[40px]'}>
                        {list?.map(({id, label}) => {
                            const value = values[id]
                            return <div key={id}
                                        className={'text-lg items-center flex justify-between gap-[20vw] md:gap-[130px]'}>
                                <span>{label}</span>
                                <div className={'flex items-center justify-center'}>
                                    <Minus onClick={() => onSetValue(id, value - 1)} className={'text-primary cursor-pointer'}/>
                                    <input className={'w-10 text-center'} type="text" value={values[id]} onChange={(e) => onSetValue(id, +e.target.value)}/>
                                    <Plus onClick={() => onSetValue(id, value + 1)}
                                          className={'text-primary cursor-pointer'}/>
                                </div>
                            </div>
                        })}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default CountPiker;
