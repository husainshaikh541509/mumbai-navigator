import { AlertTriangle, Clock, Lightbulb, Train, ArrowRightLeft, RefreshCw } from "lucide-react";
import { FlatCard } from "./ui/flat-card";
import { cn } from "@/lib/utils";

export type CrowdingLevel = "low" | "medium" | "high";

export interface DelayAlert {
  id: string;
  line: string;
  message: string;
  delayMins?: number;
  severity: "minor" | "moderate" | "major";
  lastUpdated: string;
}

export interface CommuteTip {
  id: string;
  text: string;
  icon: "tip" | "crowd" | "platform";
}

const MUMBAI_DELAYS: DelayAlert[] = [
  {
    id: "1",
    line: "Western Line (Churchgate–Virar)",
    message: "Signal failure near Bandra. Use Harbour from CST or take Metro Line 1.",
    delayMins: 12,
    severity: "moderate",
    lastUpdated: "8 min ago",
  },
  {
    id: "2",
    line: "Central Main (CST–Kalyan)",
    message: "Crowd management at Dadar. Trains running 5–7 min late.",
    delayMins: 7,
    severity: "minor",
    lastUpdated: "3 min ago",
  },
];

const MUMBAI_TIPS: CommuteTip[] = [
  { id: "1", text: "Peak hours 8–10 AM & 6–8 PM: Board from origin for a seat.", icon: "crowd" },
  { id: "2", text: "Platform 1 at Churchgate = slow, Platform 2–3 = fast.", icon: "platform" },
];

const severityStyles = {
  minor: "border-warning/50 bg-warning/10",
  moderate: "border-warning bg-warning/15",
  major: "border-destructive bg-destructive/15",
};

export function SmartCommuteAssistant({ className }: { className?: string }) {
  const delayed = MUMBAI_DELAYS.filter((d) => (d.delayMins ?? 0) > 0);

  return (
    <div className={cn("", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
          <Train className="w-3.5 h-3.5 text-primary" />
          Live Updates
        </h3>
        <span className="text-2xs text-muted-foreground flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-success animate-pulse" />
          Live
        </span>
      </div>

      {/* Delays */}
      <div className="space-y-2 mb-3">
        {delayed.slice(0, 2).map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "border p-2",
              severityStyles[alert.severity]
            )}
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-warning mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-foreground truncate">{alert.line}</p>
                  {alert.delayMins != null && alert.delayMins > 0 && (
                    <span className="text-2xs text-warning font-medium shrink-0">+{alert.delayMins}m</span>
                  )}
                </div>
                <p className="text-2xs text-muted-foreground mt-0.5">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="border-t border-border pt-2">
        <p className="text-2xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
          <Lightbulb className="w-3 h-3" /> Tips
        </p>
        <ul className="space-y-0.5">
          {MUMBAI_TIPS.map((tip) => (
            <li key={tip.id} className="text-2xs text-muted-foreground leading-snug">
              • {tip.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
