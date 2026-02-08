import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface FlatCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "filled" | "interactive";
  dense?: boolean;
}

const FlatCard = forwardRef<HTMLDivElement, FlatCardProps>(
  ({ className, variant = "default", dense = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-card border border-border",
      bordered: "bg-transparent border border-border",
      filled: "bg-secondary border border-border",
      interactive: "bg-card border border-border hover:bg-secondary hover:border-muted-foreground/30 cursor-pointer transition-colors",
    };

    return (
      <div
        ref={ref}
        className={cn(
          variants[variant],
          dense ? "p-2" : "p-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FlatCard.displayName = "FlatCard";

export { FlatCard };
