import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal, MapPin } from "lucide-react";
import { FlatCard } from "@/components/ui/flat-card";
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
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-foreground">Route Options</h1>
            <p className="text-xs text-muted-foreground truncate">{from} → {to}</p>
          </div>
          <button className="p-2 border border-border hover:bg-secondary transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Journey Summary */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success" />
              <span className="text-sm font-medium text-foreground">{from}</span>
            </div>
            <span className="text-muted-foreground">—</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-destructive" />
              <span className="text-sm font-medium text-foreground">{to}</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary border border-border">
            ~45 min
          </span>
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 py-2 border-b border-border bg-secondary/30">
        <p className="text-xs text-muted-foreground">{mockRoutes.length} routes found</p>
      </div>

      {/* Route List */}
      <div className="divide-y divide-border">
        {mockRoutes.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            onClick={() => navigate(`/details/${route.id}`)}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
