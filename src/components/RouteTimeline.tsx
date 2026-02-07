import { Train, TrainFront, Bus, Car, Footprints, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { TransportMode } from "./TransportModeFilter";

interface TimelineStep {
  mode: TransportMode;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  line?: string;
  platform?: string;
  instructions?: string;
}

interface RouteTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

const modeIcons: Record<TransportMode, React.ElementType> = {
  train: Train,
  metro: TrainFront,
  bus: Bus,
  cab: Car,
  walk: Footprints,
};

const modeColors: Record<TransportMode, { bg: string; border: string; text: string }> = {
  train: { bg: "bg-transport-train/20", border: "border-transport-train", text: "text-transport-train" },
  metro: { bg: "bg-transport-metro/20", border: "border-transport-metro", text: "text-transport-metro" },
  bus: { bg: "bg-transport-bus/20", border: "border-transport-bus", text: "text-transport-bus" },
  cab: { bg: "bg-transport-cab/20", border: "border-transport-cab", text: "text-transport-cab" },
  walk: { bg: "bg-transport-walk/20", border: "border-transport-walk", text: "text-transport-walk" },
};

export function RouteTimeline({ steps, className }: RouteTimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, index) => {
        const Icon = modeIcons[step.mode];
        const colors = modeColors[step.mode];
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="relative">
            {/* Departure Point */}
            <div className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2",
                    colors.border,
                    colors.bg
                  )}
                />
                <div
                  className={cn(
                    "w-0.5 flex-1 min-h-[60px]",
                    colors.bg
                  )}
                />
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{step.from}</p>
                    {step.platform && (
                      <p className="text-xs text-muted-foreground">
                        Platform {step.platform}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {step.departureTime}
                  </span>
                </div>

                {/* Mode Card */}
                <div className={cn("mt-3 p-3 rounded-xl", colors.bg)}>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        colors.bg,
                        "border",
                        colors.border
                      )}
                    >
                      <Icon className={cn("w-5 h-5", colors.text)} />
                    </div>
                    <div className="flex-1">
                      <p className={cn("font-medium text-sm", colors.text)}>
                        {step.mode.charAt(0).toUpperCase() + step.mode.slice(1)}
                        {step.line && ` • ${step.line}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {step.duration} • {step.instructions || `To ${step.to}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrival Point (only for last step) */}
            {isLast && (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-accent border-2 border-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{step.to}</p>
                      <p className="text-xs text-muted-foreground">Destination</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {step.arrivalTime}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
