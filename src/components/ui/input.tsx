'use client'
import * as React from "react"

import {cn} from "@/lib/utils"
import {useEffect, useRef} from "react"
import PhoneInput from "react-phone-input-2";
import {cva, VariantProps} from "class-variance-authority";

const inputVariants = cva(
    'md:text-lg',
    {
        variants: {
            variant: {
                default: 'border-input bg-background placeholder:text-muted-foreground',
                lite: 'border-input bg-white !text-black font-semibold placeholder:text-black',
            },
            inputType: {
                default: '',
                number: '',
            }
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    rightText?: string;
}


const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, rightText, variant , inputType= 'default', type, ...props}, ref) => {
        const [textWidth, setTextWidth] = React.useState(0)
        const textRef = useRef<HTMLSpanElement>(null)
        useEffect(() => {
            setTextWidth(textRef?.current?.clientWidth ?? 0)
        }, [textRef?.current]);

        if (inputType === 'default') return (
            <div className={'inline-block relative'}>
                <input
                    type={type}
                    style={{
                        paddingRight: `${(textWidth) + 30.5}px`
                    }}
                    className={cn(
                        `flex w-full rounded-lg border border-input md:pl-[28.5px] md:py-[20px] py-[13px] px-[11px] text-sm md:text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
                        inputVariants({variant}), className
                    )}
                    ref={ref}
                    {...props}
                />
                {rightText && <span ref={textRef}
                                    className={'md:text-lg absolute top-[50%] right-[28.5px] translate-y-[-50%]'}>{rightText}</span>}
            </div>
        )

        return (
            <PhoneInput
                country={'ru'}
                specialLabel={''}
                dropdownClass={'bg-white left-[-25px] !rounded-lg border border-input !shadow-none'}
                buttonClass={'!bg-transparent h-auto !border-none [&>.selected-flag>.flag]:scale-[1.5] [&>.selected-flag]:hover:!bg-transparent hover:!bg-transparent'}
                containerClass={cn('md:px-[30px] md:py-[15px] border border-input rounded-lg inline-block !w-auto', inputVariants({variant}))}
                inputClass={'!bg-transparent !w-full !border-none !ml-2 placeholder:!text-black md:!text-lg !text-black font-semibold'}
                value={props.value as string}
                onChange={(phone, __, event) => props?.onChange?.(phone as any)}
            />
        )
    }
)
Input.displayName = "Input"

export {Input}
