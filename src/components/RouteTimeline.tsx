import { Train, TrainFront, Bus, Car, Footprints } from "lucide-react";
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

export function RouteTimeline({ steps, className }: RouteTimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, index) => {
        const Icon = modeIcons[step.mode];
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="relative">
            {/* Departure Point */}
            <div className="flex gap-3">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 border-2 border-primary bg-background" />
                <div className="w-px flex-1 min-h-[50px] bg-border" />
              </div>

              {/* Content */}
              <div className="flex-1 pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{step.from}</p>
                    {step.platform && (
                      <p className="text-2xs text-muted-foreground">Platform {step.platform}</p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{step.departureTime}</span>
                </div>

                {/* Mode Card */}
                <div className="border border-border bg-secondary/30 p-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-secondary border border-border">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-foreground">
                        {step.mode.charAt(0).toUpperCase() + step.mode.slice(1)}
                        {step.line && ` • ${step.line}`}
                      </p>
                      <p className="text-2xs text-muted-foreground">
                        {step.duration} • {step.instructions || `To ${step.to}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrival Point (only for last step) */}
            {isLast && (
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{step.to}</p>
                      <p className="text-2xs text-muted-foreground">Destination</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{step.arrivalTime}</span>
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
