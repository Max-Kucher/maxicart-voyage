'use client'

import React, {FC, useEffect, useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from '@/lib/utils';
import {Button} from './button';
import {CalendarDaysIcon} from 'lucide-react';
import {format} from 'date-fns';
import {Calendar} from './calendar';
import {ru, enUS} from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import {useLocale} from "next-intl";

interface DatepickerProps {
    className?: string
    date: {
        from: Date
        to: Date
    }
    placeholder?: string
    setDate: (date?: DateRange) => void
}

const Datepicker: FC<DatepickerProps> = ({className, placeholder, date, setDate}) => {
    const lng = useLocale()
    const pikerLng = {
        ru,
        en: enUS
    }[lng];

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "justify-start md:text-left font-normal md:p-[20px] p-[14px] h-auto",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarDaysIcon className="mr-2 h-[27px] w-[27px] text-primary"/>
                        <span className={'inline-block md:px-[25px] md:text-lg text-sm text-[#5F5F5F]'}>
                            {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y", {locale: pikerLng})} -{" "}
                                            {format(date.to, "LLL dd, y", {locale: pikerLng})}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y", {locale: pikerLng})
                                    )
                                ) :
                                placeholder
                            }
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        fromDate={new Date()}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default Datepicker;
