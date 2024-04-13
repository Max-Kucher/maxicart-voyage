import * as React from "react"

import {cn} from "@/lib/utils"
import {cva, VariantProps} from "class-variance-authority";

const textareaVariants = cva(
    'md:text-lg',
    {
        variants: {
            variant: {
                default: 'border-input bg-background placeholder:text-muted-foreground',
                lite: 'border-input bg-white !text-black font-semibold placeholder:text-black',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {

    error?: boolean;
    errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({className, variant, error, errorMessage, ...props}, ref) => {
        return (
            <>
                <textarea
                    className={cn(
                        "flex min-h-[166px] w-full rounded-lg border border-input bg-background py-[13px] px-[11px] md:px-[30px] md:py-[22px] text-sm md:text-lg font-semibold placeholder:text-black ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        textareaVariants({variant}), className, error ? 'shadow shadow-red-500' : ''
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <div className={`text-red-500 mt-2`}>{errorMessage}</div>
                )}
            </>
        )
    }
)
Textarea.displayName = "Textarea"

export {Textarea}
