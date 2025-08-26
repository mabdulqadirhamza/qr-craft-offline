import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          // subtle highlight and transitions
          "transition-colors transition-shadow duration-200",
          // theme-aware background lift on hover/focus (visible in both themes)
          "hover:bg-black/5 dark:hover:bg-white/5 focus:bg-black/5 dark:focus:bg-white/5",
          // also keep slight alt background lift for systems with custom tokens
          "hover:bg-[hsl(var(--background-alt))] focus:bg-[hsl(var(--background-alt))]",
          // gentle hover border tint and stronger focus border
          "hover:border-[hsl(var(--ring))] focus:border-[hsl(var(--ring))]",
          // stronger focus shadow
          "shadow-sm focus:shadow-md",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
