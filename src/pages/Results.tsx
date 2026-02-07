import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal, MapPin } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { RouteCard, Route } from "@/components/RouteCard";
import { BottomNav } from "@/components/BottomNav";

// Mock route data
const mockRoutes: Route[] = [
  {
    id: "1",
    totalDuration: "45 min",
    totalCost: 35,
    departureTime: "8:30 AM",
    arrivalTime: "9:15 AM",
    recommended: true,
    segments: [
      { mode: "metro", from: "Churchgate", to: "Andheri", duration: "38 min", line: "Western Line" },
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
    segments: [
      { mode: "train", from: "Churchgate", to: "Dadar", duration: "22 min" },
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
    segments: [
      { mode: "bus", from: "Churchgate", to: "Bandra", duration: "30 min", line: "Route 123" },
      { mode: "train", from: "Bandra", to: "Andheri", duration: "15 min" },
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
            <h1 className="text-xl font-bold text-foreground">Route Options</h1>
            <p className="text-sm text-muted-foreground">
              {from} → {to}
            </p>
          </div>
          <button className="w-10 h-10 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors">
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Route Summary Card */}
        <GlassCard className="p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div>
                <p className="font-semibold text-foreground">{from}</p>
                <p className="text-xs text-muted-foreground">Departure</p>
              </div>
            </div>
            <div className="flex-1 mx-4">
              <div className="h-0.5 bg-border relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 px-2 py-1 rounded-full bg-secondary text-xs text-muted-foreground">
                  ~45 min
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold text-foreground text-right">{to}</p>
                <p className="text-xs text-muted-foreground">Destination</p>
              </div>
              <MapPin className="w-5 h-5 text-accent" />
            </div>
          </div>
        </GlassCard>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {mockRoutes.length} routes found
        </p>
      </motion.div>

      {/* Route List */}
      <div className="px-4 space-y-4">
        {mockRoutes.map((route, index) => (
          <motion.div
            key={route.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.1 }}
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
