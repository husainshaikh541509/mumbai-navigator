import { Clock, IndianRupee, AlertTriangle, Train, TrainFront, Bus, Car, Footprints } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import { cn } from "@/lib/utils";
import { TransportMode } from "./TransportModeFilter";

interface RouteSegment {
  mode: TransportMode;
  from: string;
  to: string;
  duration: string;
  line?: string;
}

export interface Route {
  id: string;
  totalDuration: string;
  totalCost: number;
  delay?: number;
  segments: RouteSegment[];
  departureTime: string;
  arrivalTime: string;
  recommended?: boolean;
}

interface RouteCardProps {
  route: Route;
  onClick?: () => void;
  className?: string;
}

const modeIcons: Record<TransportMode, React.ElementType> = {
  train: Train,
  metro: TrainFront,
  bus: Bus,
  cab: Car,
  walk: Footprints,
};

const modeColors: Record<TransportMode, string> = {
  train: "bg-transport-train",
  metro: "bg-transport-metro",
  bus: "bg-transport-bus",
  cab: "bg-transport-cab",
  walk: "bg-transport-walk",
};

export function RouteCard({ route, onClick, className }: RouteCardProps) {
  return (
    <GlassCard
      variant="interactive"
      onClick={onClick}
      className={cn("p-4", className)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">
            {route.departureTime}
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="text-lg font-semibold text-foreground">
            {route.arrivalTime}
          </span>
        </div>
        {route.recommended && (
          <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
            Recommended
          </span>
        )}
      </div>

      {/* Route Segments Visual */}
      <div className="flex items-center gap-1 mb-4">
        {route.segments.map((segment, index) => {
          const Icon = modeIcons[segment.mode];
          return (
            <div key={index} className="flex items-center">
              <div
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg",
                  modeColors[segment.mode] + "/20"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", `text-transport-${segment.mode}`)} />
                <span className="text-xs font-medium text-foreground">
                  {segment.duration}
                </span>
              </div>
              {index < route.segments.length - 1 && (
                <div className="w-4 h-0.5 bg-border mx-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{route.totalDuration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <IndianRupee className="w-4 h-4" />
            <span className="text-sm">{route.totalCost}</span>
          </div>
        </div>
        {route.delay && route.delay > 0 && (
          <div className="flex items-center gap-1.5 text-warning">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">+{route.delay} min delay</span>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
