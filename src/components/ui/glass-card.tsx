import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "strong" | "interactive";
  glow?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", glow = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-card/80 backdrop-blur-xl border border-glass-border/30",
      subtle: "bg-card/50 backdrop-blur-md border border-glass-border/20",
      strong: "bg-card/90 backdrop-blur-2xl border border-glass-border/40",
      interactive: "bg-card/80 backdrop-blur-xl border border-glass-border/30 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 cursor-pointer",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl shadow-glass",
          variants[variant],
          glow && "shadow-glow",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
