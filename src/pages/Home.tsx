import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Search, Bell, ChevronRight, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { StationSelector } from "@/components/StationSelector";
import { TransportModeFilter, TransportMode } from "@/components/TransportModeFilter";
import { BottomNav } from "@/components/BottomNav";

const recentSearches = [
  { from: "Churchgate", to: "Andheri", time: "Today, 8:30 AM" },
  { from: "CST", to: "Thane", time: "Yesterday" },
  { from: "Dadar", to: "Bandra", time: "2 days ago" },
];

export default function Home() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedModes, setSelectedModes] = useState<TransportMode[]>([
    "train",
    "metro",
    "bus",
  ]);
  const [date, setDate] = useState("Today");
  const [time, setTime] = useState("Now");

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    if (from && to) {
      navigate(`/results?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
    }
  };

  return (
    <div className="min-h-screen gradient-mesh pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-4 pt-12 pb-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Good Morning</p>
            <h1 className="text-2xl font-bold text-foreground">Plan Your Trip</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-medium">
                3
              </span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">JD</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Search Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-4 mb-6"
      >
        <GlassCard className="p-5" glow>
          {/* Station Selector */}
          <StationSelector
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
            onSwap={handleSwap}
            className="mb-5 bg-secondary/30"
          />

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <GlassCard variant="subtle" className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">{date}</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="subtle" className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-medium text-foreground">{time}</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Transport Mode Filter */}
          <div className="mb-5">
            <p className="text-sm text-muted-foreground mb-3">Transport Modes</p>
            <TransportModeFilter
              selected={selectedModes}
              onChange={setSelectedModes}
            />
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={!from || !to}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-glow hover:shadow-glow hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Routes
          </Button>
        </GlassCard>
      </motion.div>

      {/* Recent Searches */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Searches</h2>
          <button className="text-sm text-primary hover:underline">View All</button>
        </div>

        <div className="space-y-3">
          {recentSearches.map((search, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <GlassCard
                variant="interactive"
                className="p-4"
                onClick={() => {
                  setFrom(search.from);
                  setTo(search.to);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Train className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {search.from} → {search.to}
                      </p>
                      <p className="text-xs text-muted-foreground">{search.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
