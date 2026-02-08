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

const modeLabels: Record<TransportMode, string> = {
  train: "Train",
  metro: "Metro",
  bus: "Bus",
  cab: "Cab",
  walk: "Walk",
};

const crowdingLabel: Record<CrowdingLevel, string> = {
  low: "Low",
  medium: "Mod",
  high: "High",
};

const crowdingColor: Record<CrowdingLevel, string> = {
  low: "text-success",
  medium: "text-warning",
  high: "text-destructive",
};

export function RouteCard({ route, onClick, className }: RouteCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "px-4 py-3 hover:bg-secondary/50 cursor-pointer transition-colors",
        className
      )}
    >
      {/* Top row: times and badges */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-foreground">{route.departureTime}</span>
          <span className="text-muted-foreground text-sm">→</span>
          <span className="text-base font-semibold text-foreground">{route.arrivalTime}</span>
        </div>
        <div className="flex items-center gap-2">
          {route.delay != null && route.delay > 0 && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-warning/20 text-warning text-2xs font-medium border border-warning/30">
              <AlertTriangle className="w-3 h-3" />
              +{route.delay}m
            </span>
          )}
          {route.recommended && (
            <span className="px-1.5 py-0.5 bg-primary/20 text-primary text-2xs font-medium border border-primary/30">
              BEST
            </span>
          )}
        </div>
      </div>

      {/* Transport segments */}
      <div className="flex items-center gap-1 flex-wrap mb-2">
        {route.segments.map((segment, index) => {
          const Icon = modeIcons[segment.mode];
          return (
            <div key={index} className="flex items-center gap-1">
              <div className="flex items-center gap-1 px-1.5 py-1 bg-secondary border border-border">
                <Icon className="w-3 h-3 text-muted-foreground" />
                <span className="text-2xs text-foreground font-medium">{segment.duration}</span>
              </div>
              {index < route.segments.length - 1 && (
                <span className="text-muted-foreground/60 text-xs">›</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer: meta info */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-2xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {route.totalDuration}
        </span>
        <span className="flex items-center gap-1">
          <IndianRupee className="w-3 h-3" />
          ₹{route.totalCost}
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
            P{route.platform}
          </span>
        )}
        {route.lastUpdateTime && (
          <span className="flex items-center gap-1 ml-auto">
            <RefreshCw className="w-3 h-3" />
            {route.lastUpdateTime}
          </span>
        )}
      </div>
    </div>
  );
}
