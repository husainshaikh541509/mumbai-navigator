import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Search, Bell, ArrowRightLeft, MapPin, Navigation } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { TransportModeFilter, TransportMode } from "@/components/TransportModeFilter";
import { SmartCommuteAssistant } from "@/components/SmartCommuteAssistant";
import { BottomNav } from "@/components/BottomNav";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const MUMBAI_STATIONS = [
  "Churchgate", "CST", "Dadar", "Bandra", "Andheri", "Borivali", "Thane", "Kurla",
  "Ghatkopar", "Vashi", "Virar", "Kalyan", "Nerul", "Belapur", "Goregaon", "Malad", "Jogeshwari",
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
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("Now");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const timeOptions = ["Now", "06:00", "07:00", "08:00", "09:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

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

  const filteredFromStations = MUMBAI_STATIONS.filter(s =>
    s.toLowerCase().includes(from.toLowerCase()) && s !== to
  );
  const filteredToStations = MUMBAI_STATIONS.filter(s =>
    s.toLowerCase().includes(to.toLowerCase()) && s !== from
  );

  const popularMumbaiRoutes = [
    { from: "Churchgate", to: "Andheri", label: "Western suburban" },
    { from: "CST", to: "Thane", label: "Central" },
    { from: "Dadar", to: "Borivali", label: "Western" },
    { from: "Ghatkopar", to: "Versova", label: "Metro Line 1" },
    { from: "Vashi", to: "Belapur", label: "Harbour / Belapur" },
  ];

  return (
    <div className="min-h-screen gradient-mesh pb-20">
      {/* Header – compact */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-4 pt-10 pb-2"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Mumbai locals & metro</p>
            <h1 className="text-xl font-bold text-foreground">Plan journey</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl bg-secondary/60 border border-border/30 flex items-center justify-center relative">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-[9px] text-primary-foreground flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <div className="w-9 h-9 rounded-xl bg-primary/90 flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">JD</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Smart Commute Assistant – above search */}
      <div className="px-4 mb-3">
        <SmartCommuteAssistant />
      </div>

      {/* Search card – denser */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="px-4 mb-3"
      >
        <GlassCard className="p-4">
          <div className="relative mb-3">
            <div className="relative">
              <GlassCard variant="subtle" className="p-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-2xs text-muted-foreground uppercase tracking-wide">From</p>
                    <input
                      type="text"
                      value={from}
                      onChange={(e) => {
                        setFrom(e.target.value);
                        setShowFromDropdown(true);
                      }}
                      onFocus={() => setShowFromDropdown(true)}
                      onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
                      placeholder="e.g. Churchgate, Dadar"
                      className="w-full bg-transparent text-sm font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                    />
                  </div>
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              </GlassCard>
              {showFromDropdown && filteredFromStations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 right-0 top-full z-20 -mt-1"
                >
                  <GlassCard variant="strong" className="p-1.5 max-h-40 overflow-y-auto">
                    {filteredFromStations.map((station) => (
                      <button
                        key={station}
                        onClick={() => {
                          setFrom(station);
                          setShowFromDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/10 text-foreground text-sm transition-colors"
                      >
                        {station}
                      </button>
                    ))}
                  </GlassCard>
                </motion.div>
              )}
            </div>

            <div className="absolute left-1/2 top-[52px] -translate-x-1/2 z-10">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSwap}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center border-2 border-background"
              >
                <ArrowRightLeft className="w-4 h-4 text-primary-foreground" />
              </motion.button>
            </div>

            <div className="relative">
              <GlassCard variant="subtle" className="p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-2xs text-muted-foreground uppercase tracking-wide">To</p>
                    <input
                      type="text"
                      value={to}
                      onChange={(e) => {
                        setTo(e.target.value);
                        setShowToDropdown(true);
                      }}
                      onFocus={() => setShowToDropdown(true)}
                      onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
                      placeholder="e.g. Andheri, Thane"
                      className="w-full bg-transparent text-sm font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                    />
                  </div>
                  <Navigation className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              </GlassCard>
              {showToDropdown && filteredToStations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 right-0 top-full z-20 mt-0.5"
                >
                  <GlassCard variant="strong" className="p-1.5 max-h-40 overflow-y-auto">
                    {filteredToStations.map((station) => (
                      <button
                        key={station}
                        onClick={() => {
                          setTo(station);
                          setShowToDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/10 text-foreground text-sm transition-colors"
                      >
                        {station}
                      </button>
                    ))}
                  </GlassCard>
                </motion.div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full">
                  <GlassCard variant="subtle" className="p-2.5 hover:border-primary/40 transition-colors flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs font-medium text-foreground truncate">
                      {format(date, "MMM d")}
                    </span>
                  </GlassCard>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-card/95 backdrop-blur-xl border-border/30" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full">
                  <GlassCard variant="subtle" className="p-2.5 hover:border-primary/40 transition-colors flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs font-medium text-foreground">{time}</span>
                  </GlassCard>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-2 bg-card/95 backdrop-blur-xl border-border/30" align="start">
                <div className="max-h-48 overflow-y-auto space-y-0.5">
                  {timeOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        time === t ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="mb-3">
            <p className="text-2xs text-muted-foreground uppercase tracking-wide mb-1.5">Modes</p>
            <TransportModeFilter selected={selectedModes} onChange={setSelectedModes} />
          </div>

          <Button
            onClick={handleSearch}
            disabled={!from || !to}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Search className="w-4 h-4 mr-2" />
            Find route
          </Button>
        </GlassCard>
      </motion.div>

      {/* Popular routes – Mumbai-specific, denser */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="px-4"
      >
        <p className="text-2xs text-muted-foreground uppercase tracking-wide mb-2">Popular Mumbai routes</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {popularMumbaiRoutes.map((route, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={() => {
                setFrom(route.from);
                setTo(route.to);
              }}
              className="flex-shrink-0"
            >
              <GlassCard variant="interactive" className="px-3 py-2 whitespace-nowrap">
                <span className="text-xs font-medium text-foreground">
                  {route.from} → {route.to}
                </span>
              </GlassCard>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
