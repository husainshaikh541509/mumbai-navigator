import { Train, TrainFront, Bus, Car, Footprints } from "lucide-react";
import { cn } from "@/lib/utils";

export type TransportMode = "train" | "metro" | "bus" | "cab" | "walk";

interface TransportModeFilterProps {
  selected: TransportMode[];
  onChange: (modes: TransportMode[]) => void;
}

const modes: { id: TransportMode; label: string; icon: React.ElementType }[] = [
  { id: "train", label: "Train", icon: Train },
  { id: "metro", label: "Metro", icon: TrainFront },
  { id: "bus", label: "Bus", icon: Bus },
  { id: "cab", label: "Cab", icon: Car },
  { id: "walk", label: "Walk", icon: Footprints },
];

export function TransportModeFilter({ selected, onChange }: TransportModeFilterProps) {
  const toggleMode = (mode: TransportMode) => {
    if (selected.includes(mode)) {
      onChange(selected.filter((m) => m !== mode));
    } else {
      onChange([...selected, mode]);
    }
  };

  return (
    <div className="flex gap-1 flex-wrap">
      {modes.map((mode) => {
        const isSelected = selected.includes(mode.id);
        const Icon = mode.icon;
        return (
          <button
            key={mode.id}
            onClick={() => toggleMode(mode.id)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 border text-xs font-medium transition-colors",
              isSelected
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-muted-foreground"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
