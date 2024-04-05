'use client'
import * as React from "react"

import {cn} from "@/lib/utils"
import {useEffect, useRef} from "react"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    rightText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, rightText, type, ...props}, ref) => {
        const [textWidth, setTextWidth] = React.useState(0)
        const textRef = useRef<HTMLSpanElement>(null)
        useEffect(() => {
            setTextWidth(textRef?.current?.clientWidth ?? 0)
        }, [textRef?.current]);

        return (
            <div className={'inline-block relative'}>
              <input
                  type={type}
                  style={{
                      paddingRight: `${(textWidth) + 30.5}px`
                  }}
                  className={cn(
                      `flex w-full rounded-md border border-input bg-background md:pl-[28.5px] md:py-[21px] md:text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
                      className
                  )}
                  ref={ref}
                  {...props}
              />
                {rightText && <span ref={textRef}
                                    className={'md:text-lg absolute top-[50%] right-[28.5px] translate-y-[-50%]'}>{rightText}</span>}
            </div>
        )
    }
)
Input.displayName = "Input"

export {Input}
