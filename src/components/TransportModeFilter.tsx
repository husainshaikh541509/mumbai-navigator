import { Train, TrainFront, Bus, Car, Footprints } from "lucide-react";
import { cn } from "@/lib/utils";

export type TransportMode = "train" | "metro" | "bus" | "cab" | "walk";

interface TransportModeFilterProps {
  selected: TransportMode[];
  onChange: (modes: TransportMode[]) => void;
}

const modes: { id: TransportMode; label: string; icon: React.ElementType; color: string }[] = [
  { id: "train", label: "Train", icon: Train, color: "text-transport-train border-transport-train/50 bg-transport-train/10" },
  { id: "metro", label: "Metro", icon: TrainFront, color: "text-transport-metro border-transport-metro/50 bg-transport-metro/10" },
  { id: "bus", label: "Bus", icon: Bus, color: "text-transport-bus border-transport-bus/50 bg-transport-bus/10" },
  { id: "cab", label: "Cab", icon: Car, color: "text-transport-cab border-transport-cab/50 bg-transport-cab/10" },
  { id: "walk", label: "Walk", icon: Footprints, color: "text-transport-walk border-transport-walk/50 bg-transport-walk/10" },
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
    <div className="flex gap-1.5 flex-wrap">
      {modes.map((mode) => {
        const isSelected = selected.includes(mode.id);
        const Icon = mode.icon;
        return (
          <button
            key={mode.id}
            onClick={() => toggleMode(mode.id)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200",
              isSelected
                ? mode.color
                : "text-muted-foreground border-border/50 bg-secondary/50 hover:bg-secondary"
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
