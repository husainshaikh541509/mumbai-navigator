import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal, MapPin } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { RouteCard, Route } from "@/components/RouteCard";
import { BottomNav } from "@/components/BottomNav";

const mockRoutes: Route[] = [
  {
    id: "1",
    totalDuration: "45 min",
    totalCost: 35,
    departureTime: "8:30 AM",
    arrivalTime: "9:15 AM",
    recommended: true,
    delay: 0,
    crowding: "medium",
    platform: "2",
    lastUpdateTime: "2 min ago",
    segments: [
      { mode: "metro", from: "Churchgate", to: "Andheri", duration: "38 min", line: "Metro Line 1" },
      { mode: "walk", from: "Andheri Metro", to: "Andheri Station", duration: "7 min" },
    ],
  },
  {
    id: "2",
    totalDuration: "52 min",
    totalCost: 25,
    departureTime: "8:35 AM",
    arrivalTime: "9:27 AM",
    delay: 5,
    crowding: "high",
    platform: "3",
    lastUpdateTime: "1 min ago",
    segments: [
      { mode: "train", from: "Churchgate", to: "Dadar", duration: "22 min", line: "Western" },
      { mode: "metro", from: "Dadar", to: "Andheri", duration: "25 min" },
      { mode: "walk", from: "Andheri Metro", to: "Andheri", duration: "5 min" },
    ],
  },
  {
    id: "3",
    totalDuration: "38 min",
    totalCost: 180,
    departureTime: "8:30 AM",
    arrivalTime: "9:08 AM",
    crowding: "low",
    lastUpdateTime: "5 min ago",
    segments: [
      { mode: "cab", from: "Churchgate", to: "Andheri", duration: "38 min" },
    ],
  },
  {
    id: "4",
    totalDuration: "55 min",
    totalCost: 20,
    departureTime: "8:40 AM",
    arrivalTime: "9:35 AM",
    delay: 3,
    crowding: "medium",
    platform: "1",
    lastUpdateTime: "4 min ago",
    segments: [
      { mode: "bus", from: "Churchgate", to: "Bandra", duration: "30 min", line: "BEST 123" },
      { mode: "train", from: "Bandra", to: "Andheri", duration: "15 min", line: "Western" },
      { mode: "walk", from: "Andheri Station", to: "Andheri", duration: "10 min" },
    ],
  },
];

export default function Results() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "Churchgate";
  const to = searchParams.get("to") || "Andheri";

  return (
    <div className="min-h-screen gradient-mesh pb-20">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-4 pt-10 pb-2"
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground truncate">Route options</h1>
            <p className="text-xs text-muted-foreground truncate">{from} → {to}</p>
          </div>
          <button className="w-9 h-9 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <GlassCard className="p-3 mb-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">{from}</p>
                <p className="text-2xs text-muted-foreground">From</p>
              </div>
            </div>
            <div className="flex-1 mx-2 min-w-0">
              <div className="h-px bg-border relative">
                <span className="absolute left-1/2 -translate-x-1/2 -top-1.5 px-1.5 py-0.5 rounded bg-secondary text-2xs text-muted-foreground">
                  ~45 min
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-right min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">{to}</p>
                <p className="text-2xs text-muted-foreground">To</p>
              </div>
              <MapPin className="w-4 h-4 text-accent shrink-0" />
            </div>
          </div>
        </GlassCard>

        <p className="text-2xs text-muted-foreground">{mockRoutes.length} routes</p>
      </motion.div>

      <div className="px-4 space-y-3">
        {mockRoutes.map((route, index) => (
          <motion.div
            key={route.id}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 + index * 0.05 }}
          >
            <RouteCard
              route={route}
              onClick={() => navigate(`/details/${route.id}`)}
            />
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
