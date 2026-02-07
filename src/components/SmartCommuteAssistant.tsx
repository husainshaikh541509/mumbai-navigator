import { AlertTriangle, Clock, Lightbulb, Train, ArrowRightLeft, RefreshCw } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
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
  {
    id: "3",
    line: "Metro Line 1 (Versova–Ghatkopar)",
    message: "On time. Good option to skip Western Line congestion.",
    delayMins: 0,
    severity: "minor",
    lastUpdated: "1 min ago",
  },
];

const MUMBAI_TIPS: CommuteTip[] = [
  { id: "1", text: "Peak hours 8–10 AM & 6–8 PM: Board from origin or 2–3 stations before Dadar/Bandra for a seat.", icon: "crowd" },
  { id: "2", text: "Ladies specials run on Western & Central; check timings if you prefer.", icon: "tip" },
  { id: "3", text: "Platform 1 at Churchgate = slow, Platform 2–3 = fast. Reverse at Borivali.", icon: "platform" },
];

const severityStyles = {
  minor: "bg-warning/15 text-warning border-warning/30",
  moderate: "bg-warning/20 text-warning border-warning/50",
  major: "bg-destructive/20 text-destructive border-destructive/50",
};

export function SmartCommuteAssistant({ className }: { className?: string }) {
  const delayed = MUMBAI_DELAYS.filter((d) => (d.delayMins ?? 0) > 0);
  const onTime = MUMBAI_DELAYS.filter((d) => (d.delayMins ?? 0) === 0);

  return (
    <GlassCard className={cn("p-3", className)}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Train className="w-4 h-4 text-primary" />
          Smart Commute Assistant
        </h3>
        <span className="text-2xs text-muted-foreground flex items-center gap-1">
          <RefreshCw className="w-3 h-3" /> Live
        </span>
      </div>

      {/* Delays & alternatives */}
      <div className="space-y-2 mb-3">
        {delayed.slice(0, 2).map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "rounded-lg border px-2.5 py-2",
              severityStyles[alert.severity]
            )}
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium leading-tight">{alert.line}</p>
                {alert.delayMins != null && alert.delayMins > 0 && (
                  <p className="text-2xs mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> +{alert.delayMins} min
                  </p>
                )}
                <p className="text-2xs mt-1 text-muted-foreground/90">{alert.message}</p>
                <p className="text-2xs mt-1 opacity-70">Updated {alert.lastUpdated}</p>
              </div>
            </div>
          </div>
        ))}
        {onTime.length > 0 && (
          <div className="flex items-center gap-1.5 text-2xs text-muted-foreground">
            <ArrowRightLeft className="w-3 h-3" />
            <span>{onTime[0].line}: {onTime[0].message}</span>
          </div>
        )}
      </div>

      {/* Mumbai tips */}
      <div className="border-t border-border/50 pt-2">
        <p className="text-2xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
          <Lightbulb className="w-3 h-3" /> Mumbai local tips
        </p>
        <ul className="space-y-1">
          {MUMBAI_TIPS.map((tip) => (
            <li key={tip.id} className="text-2xs text-muted-foreground leading-snug">
              • {tip.text}
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
}
