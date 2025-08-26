import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
Input.displayName = "Input"

export { Input }
