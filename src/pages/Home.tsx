import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Search, Bell, ArrowRightLeft, MapPin, Navigation } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { TransportModeFilter, TransportMode } from "@/components/TransportModeFilter";
import { BottomNav } from "@/components/BottomNav";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const popularStations = [
  "Churchgate", "CST", "Dadar", "Bandra", "Andheri", "Borivali", "Thane", "Kurla", "Ghatkopar", "Vashi"
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

  const filteredFromStations = popularStations.filter(s => 
    s.toLowerCase().includes(from.toLowerCase()) && s !== to
  );
  
  const filteredToStations = popularStations.filter(s => 
    s.toLowerCase().includes(to.toLowerCase()) && s !== from
  );

  return (
    <div className="min-h-screen gradient-mesh pb-24">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-5 pt-14 pb-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Welcome back</p>
            <h1 className="text-2xl font-bold text-foreground">Plan Your Journey</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-11 h-11 rounded-2xl bg-secondary/60 backdrop-blur-sm border border-border/30 flex items-center justify-center relative shadow-glass">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-bold shadow-glow">
                3
              </span>
            </button>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <span className="text-sm font-bold text-primary-foreground">JD</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Booking Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="px-5 mb-6"
      >
        <GlassCard className="p-6 shadow-2xl" glow>
          {/* From/To Section */}
          <div className="relative mb-6">
            {/* From Card */}
            <div className="relative">
              <GlassCard variant="subtle" className="p-4 mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">From</p>
                    <input
                      type="text"
                      value={from}
                      onChange={(e) => {
                        setFrom(e.target.value);
                        setShowFromDropdown(true);
                      }}
                      onFocus={() => setShowFromDropdown(true)}
                      onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
                      placeholder="Select departure station"
                      className="w-full bg-transparent text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                    />
                  </div>
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
              </GlassCard>
              
              {/* From Dropdown */}
              {showFromDropdown && filteredFromStations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 right-0 top-full z-20 -mt-2"
                >
                  <GlassCard variant="strong" className="p-2 max-h-48 overflow-y-auto">
                    {filteredFromStations.map((station) => (
                      <button
                        key={station}
                        onClick={() => {
                          setFrom(station);
                          setShowFromDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-primary/10 text-foreground transition-colors"
                      >
                        {station}
                      </button>
                    ))}
                  </GlassCard>
                </motion.div>
              )}
            </div>

            {/* Swap Button */}
            <div className="absolute left-1/2 top-[72px] -translate-x-1/2 z-10">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSwap}
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-glow border-4 border-background"
              >
                <ArrowRightLeft className="w-5 h-5 text-primary-foreground" />
              </motion.button>
            </div>

            {/* To Card */}
            <div className="relative">
              <GlassCard variant="subtle" className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">To</p>
                    <input
                      type="text"
                      value={to}
                      onChange={(e) => {
                        setTo(e.target.value);
                        setShowToDropdown(true);
                      }}
                      onFocus={() => setShowToDropdown(true)}
                      onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
                      placeholder="Select arrival station"
                      className="w-full bg-transparent text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                    />
                  </div>
                  <Navigation className="w-5 h-5 text-muted-foreground" />
                </div>
              </GlassCard>
              
              {/* To Dropdown */}
              {showToDropdown && filteredToStations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 right-0 top-full z-20 mt-1"
                >
                  <GlassCard variant="strong" className="p-2 max-h-48 overflow-y-auto">
                    {filteredToStations.map((station) => (
                      <button
                        key={station}
                        onClick={() => {
                          setTo(station);
                          setShowToDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-primary/10 text-foreground transition-colors"
                      >
                        {station}
                      </button>
                    ))}
                  </GlassCard>
                </motion.div>
              )}
            </div>
          </div>

          {/* Date & Time Selectors */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full">
                  <GlassCard variant="subtle" className="p-4 hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                        <p className="text-base font-semibold text-foreground">
                          {format(date, "MMM dd")}
                        </p>
                      </div>
                    </div>
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

            {/* Time Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full">
                  <GlassCard variant="subtle" className="p-4 hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Time</p>
                        <p className="text-base font-semibold text-foreground">{time}</p>
                      </div>
                    </div>
                  </GlassCard>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 bg-card/95 backdrop-blur-xl border-border/30" align="start">
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {timeOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 rounded-lg transition-colors",
                        time === t 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-secondary text-foreground"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Transport Mode Filter */}
          <div className="mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Travel Mode</p>
            <TransportModeFilter
              selected={selectedModes}
              onChange={setSelectedModes}
            />
          </div>

          {/* Find Route Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleSearch}
              disabled={!from || !to}
              className="w-full h-16 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg shadow-glow hover:shadow-[0_0_40px_rgba(0,200,255,0.4)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <Search className="w-6 h-6 mr-3" />
              Find Route
            </Button>
          </motion.div>
        </GlassCard>
      </motion.div>

      {/* Quick Access Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-5"
      >
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Popular Routes</p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { from: "Churchgate", to: "Andheri" },
            { from: "CST", to: "Thane" },
            { from: "Dadar", to: "Borivali" },
            { from: "Bandra", to: "Kurla" },
          ].map((route, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              onClick={() => {
                setFrom(route.from);
                setTo(route.to);
              }}
              className="flex-shrink-0"
            >
              <GlassCard variant="interactive" className="px-4 py-3 whitespace-nowrap">
                <span className="text-sm font-medium text-foreground">
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