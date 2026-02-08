import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, AlertTriangle, CheckCircle, Clock, Train, TrainFront, Bus } from "lucide-react";
import { FlatCard } from "@/components/ui/flat-card";
import { BottomNav } from "@/components/BottomNav";

const liveStatus = [
  {
    id: "1",
    line: "Western Line",
    icon: Train,
    status: "on-time",
    message: "Running on schedule",
    lastUpdated: "2 min ago",
  },
  {
    id: "2",
    line: "Metro Line 1",
    icon: TrainFront,
    status: "delayed",
    message: "5-10 min delays due to signal issues",
    lastUpdated: "5 min ago",
  },
  {
    id: "3",
    line: "Central Line",
    icon: Train,
    status: "on-time",
    message: "Running on schedule",
    lastUpdated: "1 min ago",
  },
  {
    id: "4",
    line: "BEST Bus",
    icon: Bus,
    status: "disrupted",
    message: "Major delays on Route 123, 456",
    lastUpdated: "10 min ago",
  },
  {
    id: "5",
    line: "Harbour Line",
    icon: Train,
    status: "on-time",
    message: "Running on schedule",
    lastUpdated: "3 min ago",
  },
];

export default function LiveStatus() {
  const navigate = useNavigate();

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "on-time":
        return <div className="w-2 h-2 bg-success" />;
      case "delayed":
        return <div className="w-2 h-2 bg-warning" />;
      case "disrupted":
        return <div className="w-2 h-2 bg-destructive" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-time":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "delayed":
        return <Clock className="w-4 h-4 text-warning" />;
      case "disrupted":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const onTimeCount = liveStatus.filter(s => s.status === "on-time").length;
  const delayedCount = liveStatus.filter(s => s.status === "delayed").length;
  const disruptedCount = liveStatus.filter(s => s.status === "disrupted").length;

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 border border-border hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-semibold text-foreground">Live Status</h1>
            <p className="text-xs text-muted-foreground">Real-time transit updates</p>
          </div>
          <button className="p-2 border border-primary text-primary hover:bg-primary/10 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-px bg-border border-b border-border">
        <div className="bg-background p-4 text-center">
          <p className="text-xl font-bold text-success">{onTimeCount}</p>
          <p className="text-xs text-muted-foreground">On Time</p>
        </div>
        <div className="bg-background p-4 text-center">
          <p className="text-xl font-bold text-warning">{delayedCount}</p>
          <p className="text-xs text-muted-foreground">Delayed</p>
        </div>
        <div className="bg-background p-4 text-center">
          <p className="text-xl font-bold text-destructive">{disruptedCount}</p>
          <p className="text-xs text-muted-foreground">Disrupted</p>
        </div>
      </div>

      {/* Status List */}
      <div className="divide-y divide-border">
        {liveStatus.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary border border-border">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {getStatusIndicator(item.status)}
                      <h3 className="text-sm font-medium text-foreground">{item.line}</h3>
                    </div>
                    {getStatusIcon(item.status)}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{item.message}</p>
                  <p className="text-2xs text-muted-foreground/70">Updated {item.lastUpdated}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
