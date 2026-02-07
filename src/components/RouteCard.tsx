import {
  Clock,
  IndianRupee,
  AlertTriangle,
  Train,
  TrainFront,
  Bus,
  Car,
  Footprints,
  Users,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import { cn } from "@/lib/utils";
import { TransportMode } from "./TransportModeFilter";

export type CrowdingLevel = "low" | "medium" | "high";

interface RouteSegment {
  mode: TransportMode;
  from: string;
  to: string;
  duration: string;
  line?: string;
  platform?: string;
}

export interface Route {
  id: string;
  totalDuration: string;
  totalCost: number;
  delay?: number;
  crowding?: CrowdingLevel;
  platform?: string;
  lastUpdateTime?: string;
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
  train: "bg-transport-train/20 text-transport-train",
  metro: "bg-transport-metro/20 text-transport-metro",
  bus: "bg-transport-bus/20 text-transport-bus",
  cab: "bg-transport-cab/20 text-transport-cab",
  walk: "bg-transport-walk/20 text-transport-walk",
};

const crowdingLabel: Record<CrowdingLevel, string> = {
  low: "Less crowded",
  medium: "Moderate",
  high: "Heavy",
};

const crowdingColor: Record<CrowdingLevel, string> = {
  low: "text-success",
  medium: "text-warning",
  high: "text-destructive",
};

export function RouteCard({ route, onClick, className }: RouteCardProps) {
  return (
    <GlassCard
      variant="interactive"
      onClick={onClick}
      className={cn("p-3", className)}
    >
      {/* Top row: times, delay badge, recommended */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-base font-semibold text-foreground">
            {route.departureTime}
          </span>
          <span className="text-muted-foreground text-sm">→</span>
          <span className="text-base font-semibold text-foreground">
            {route.arrivalTime}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {route.delay != null && route.delay > 0 && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-warning/20 text-warning text-2xs font-medium">
              <AlertTriangle className="w-3 h-3" />
              +{route.delay} min
            </span>
          )}
          {route.recommended && (
            <span className="px-1.5 py-0.5 rounded-md bg-primary/20 text-primary text-2xs font-medium">
              Best
            </span>
          )}
        </div>
      </div>

      {/* Transport chain: multiple icons + segment duration */}
      <div className="flex items-center gap-1 flex-wrap mb-2">
        {route.segments.map((segment, index) => {
          const Icon = modeIcons[segment.mode];
          return (
            <div key={index} className="flex items-center gap-1">
              <div
                className={cn(
                  "flex items-center gap-1 px-1.5 py-1 rounded-md",
                  modeColors[segment.mode]
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="text-2xs font-medium">{segment.duration}</span>
              </div>
              {index < route.segments.length - 1 && (
                <span className="text-muted-foreground/60 text-xs">·</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer: duration, cost, crowding, platform, last update */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 border-t border-border/50 text-2xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {route.totalDuration}
        </span>
        <span className="flex items-center gap-1">
          <IndianRupee className="w-3 h-3" />
          {route.totalCost}
        </span>
        {route.crowding && (
          <span className={cn("flex items-center gap-1 font-medium", crowdingColor[route.crowding])}>
            <Users className="w-3 h-3" />
            {crowdingLabel[route.crowding]}
          </span>
        )}
        {route.platform && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            P/F {route.platform}
          </span>
        )}
        {route.lastUpdateTime && (
          <span className="flex items-center gap-1 ml-auto">
            <RefreshCw className="w-3 h-3" />
            {route.lastUpdateTime}
          </span>
        )}
      </div>
    </GlassCard>
  );
}
