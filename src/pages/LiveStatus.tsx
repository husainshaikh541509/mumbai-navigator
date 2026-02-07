import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, AlertTriangle, CheckCircle, Clock, Train, TrainFront, Bus } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { BottomNav } from "@/components/BottomNav";

const liveStatus = [
  {
    id: "1",
    line: "Western Line",
    icon: Train,
    status: "on-time",
    message: "Running on schedule",
    lastUpdated: "2 min ago",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: "2",
    line: "Metro Line 1",
    icon: TrainFront,
    status: "delayed",
    message: "5-10 min delays due to signal issues",
    lastUpdated: "5 min ago",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    id: "3",
    line: "Central Line",
    icon: Train,
    status: "on-time",
    message: "Running on schedule",
    lastUpdated: "1 min ago",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: "4",
    line: "BEST Bus",
    icon: Bus,
    status: "disrupted",
    message: "Major delays on Route 123, 456",
    lastUpdated: "10 min ago",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    id: "5",
    line: "Harbour Line",
    icon: Train,
    status: "on-time",
    message: "Running on schedule",
    lastUpdated: "3 min ago",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

export default function LiveStatus() {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-time":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "delayed":
        return <Clock className="w-5 h-5 text-warning" />;
      case "disrupted":
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-mesh pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-4 pt-12 pb-4"
      >
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Live Status</h1>
            <p className="text-sm text-muted-foreground">Real-time transit updates</p>
          </div>
          <button className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors">
            <RefreshCw className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <GlassCard className="p-3 text-center">
            <p className="text-2xl font-bold text-success">3</p>
            <p className="text-xs text-muted-foreground">On Time</p>
          </GlassCard>
          <GlassCard className="p-3 text-center">
            <p className="text-2xl font-bold text-warning">1</p>
            <p className="text-xs text-muted-foreground">Delayed</p>
          </GlassCard>
          <GlassCard className="p-3 text-center">
            <p className="text-2xl font-bold text-destructive">1</p>
            <p className="text-xs text-muted-foreground">Disrupted</p>
          </GlassCard>
        </div>
      </motion.div>

      {/* Status List */}
      <div className="px-4 space-y-4">
        {liveStatus.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <GlassCard variant="interactive" className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{item.line}</h3>
                      {getStatusIcon(item.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.message}</p>
                    <p className="text-xs text-muted-foreground/60">
                      Updated {item.lastUpdated}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
