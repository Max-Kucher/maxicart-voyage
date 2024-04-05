"use client"

import * as React from "react"
import {ChevronLeft, ChevronRight} from "lucide-react"
import {DayPicker} from "react-day-picker"

import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"
import {enUS, ru} from "date-fns/locale";
import {useLocale} from "next-intl";

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      ...props
                  }: CalendarProps) {
    const lng = useLocale()
    const pikerLng = {
        ru,
        en: enUS
    }[lng]

    return (
        <DayPicker
            locale={pikerLng}
            showOutsideDays={showOutsideDays}
            className={cn("py-3 px-6 pb-10 rounded-xl", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium text-xlg",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({variant: "outline"}),
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: cn("absolute left-1 border-none"),
                nav_button_next: cn("absolute right-1 border-none"),
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                    "text-muted-foreground rounded-md w-11 font-normal text-xl text-primary py-3",
                row: "flex w-full",
                cell: "h-11 w-11 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                    buttonVariants({variant: "ghost"}),
                    "h-11 w-11 p-0 font-normal aria-selected:opacity-100 hover:text-primary text-xl"
                ),
                day_range_end: "day-range-end",
                day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground hover:text-white focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside:
                    "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "color-black",
                day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({...props}) => <ChevronLeft className="h-5 w-5"/>,
                IconRight: ({...props}) => <ChevronRight className="h-5 w-5"/>,
            }}
            {...props}
        />
    )
}

Calendar.displayName = "Calendar"

export {Calendar}
