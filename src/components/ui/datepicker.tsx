'use client'
import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { Button } from './button';
import {CalendarDaysIcon} from 'lucide-react';
import {add, format } from 'date-fns';
import { Calendar } from './calendar';

const Datepicker = ({className}: any) => {
    const [date, setDate] = React.useState<any | undefined>({
        from: new Date(),
        to: add(new Date(), {days: 7}),
    })
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "justify-start text-left font-normal p-[20px] h-auto",
                            !date && "text-muted-foreground"
                        )}
                    >
                        {/*TODO download icon and change*/}
                        <CalendarDaysIcon className="mr-2 h-[27px] w-[27px] text-primary"/>
                        <span className={'inline-block px-[25px] text-lg'}>
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                           'Дата заезда - Дата отьезда'
                        )}
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
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default Datepicker;
