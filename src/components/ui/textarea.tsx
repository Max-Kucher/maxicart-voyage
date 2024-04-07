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
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({className, variant, ...props}, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[166px] w-full rounded-lg border border-input bg-background px-[30px] py-[22px] text-lg font-semibold placeholder:text-black ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    textareaVariants({variant}), className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export {Textarea}
