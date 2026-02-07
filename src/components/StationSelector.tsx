import { ArrowUpDown, MapPin } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import { cn } from "@/lib/utils";

interface StationSelectorProps {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onSwap: () => void;
  className?: string;
}

export function StationSelector({
  from,
  to,
  onFromChange,
  onToChange,
  onSwap,
  className,
}: StationSelectorProps) {
  return (
    <GlassCard className={cn("p-4 relative", className)}>
      <div className="space-y-3">
        {/* From Station */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">From</p>
            <input
              type="text"
              value={from}
              onChange={(e) => onFromChange(e.target.value)}
              placeholder="Select departure station"
              className="w-full bg-transparent text-foreground font-medium placeholder:text-muted-foreground/50 outline-none"
            />
          </div>
        </div>

        {/* Divider with swap button */}
        <div className="flex items-center gap-3">
          <div className="w-10 flex justify-center">
            <div className="w-0.5 h-6 bg-border" />
          </div>
          <div className="flex-1 h-px bg-border" />
          <button
            onClick={onSwap}
            className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
          >
            <ArrowUpDown className="w-4 h-4 text-primary" />
          </button>
        </div>

        {/* To Station */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">To</p>
            <input
              type="text"
              value={to}
              onChange={(e) => onToChange(e.target.value)}
              placeholder="Select destination station"
              className="w-full bg-transparent text-foreground font-medium placeholder:text-muted-foreground/50 outline-none"
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
