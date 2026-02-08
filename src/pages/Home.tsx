import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Search, Bell, ArrowUpDown, MapPin, Navigation, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { FlatCard } from "@/components/ui/flat-card";
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
    { from: "Churchgate", to: "Andheri", label: "Western" },
    { from: "CST", to: "Thane", label: "Central" },
    { from: "Dadar", to: "Borivali", label: "Western" },
    { from: "Ghatkopar", to: "Versova", label: "Metro 1" },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Mumbai Transit</p>
            <h1 className="text-lg font-semibold text-foreground">Plan Journey</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 border border-border hover:bg-secondary transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-2xs flex items-center justify-center font-medium">
                3
              </span>
            </button>
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">JD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Commute Assistant */}
      <div className="px-4 py-3 border-b border-border">
        <SmartCommuteAssistant />
      </div>

      {/* Search Form */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          {/* From Input */}
          <div className="relative mb-2">
            <div className="flex items-center border border-border bg-secondary/50">
              <div className="px-3 py-3 border-r border-border">
                <div className="w-2 h-2 bg-success" />
              </div>
              <div className="flex-1 px-3">
                <p className="text-2xs text-muted-foreground uppercase tracking-wide">FROM</p>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    setShowFromDropdown(true);
                  }}
                  onFocus={() => setShowFromDropdown(true)}
                  onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
                  placeholder="Churchgate, Dadar..."
                  className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <button className="px-3 py-3 hover:bg-secondary transition-colors">
                <MapPin className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            {showFromDropdown && filteredFromStations.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-20 border border-border bg-card max-h-40 overflow-y-auto">
                {filteredFromStations.map((station) => (
                  <button
                    key={station}
                    onClick={() => {
                      setFrom(station);
                      setShowFromDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors border-b border-border last:border-b-0"
                  >
                    {station}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="absolute left-1/2 top-[52px] -translate-x-1/2 z-10">
            <button
              onClick={handleSwap}
              className="w-8 h-8 bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* To Input */}
          <div className="relative">
            <div className="flex items-center border border-border bg-secondary/50">
              <div className="px-3 py-3 border-r border-border">
                <div className="w-2 h-2 bg-destructive" />
              </div>
              <div className="flex-1 px-3">
                <p className="text-2xs text-muted-foreground uppercase tracking-wide">TO</p>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    setShowToDropdown(true);
                  }}
                  onFocus={() => setShowToDropdown(true)}
                  onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
                  placeholder="Andheri, Thane..."
                  className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <button className="px-3 py-3 hover:bg-secondary transition-colors">
                <Navigation className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            {showToDropdown && filteredToStations.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-20 border border-border bg-card max-h-40 overflow-y-auto">
                {filteredToStations.map((station) => (
                  <button
                    key={station}
                    onClick={() => {
                      setTo(station);
                      setShowToDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors border-b border-border last:border-b-0"
                  >
                    {station}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 border border-border px-3 py-2 hover:bg-secondary transition-colors">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{format(date, "MMM d")}</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground ml-auto" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                initialFocus
                className="p-3"
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 border border-border px-3 py-2 hover:bg-secondary transition-colors">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{time}</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground ml-auto" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-36 p-1 bg-card border-border" align="start">
              <div className="max-h-48 overflow-y-auto">
                {timeOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm transition-colors",
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

        {/* Transport Modes */}
        <div className="mt-3">
          <p className="text-2xs text-muted-foreground uppercase tracking-wide mb-2">TRANSPORT MODES</p>
          <TransportModeFilter selected={selectedModes} onChange={setSelectedModes} />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          disabled={!from || !to}
          className="w-full h-11 mt-4 bg-primary text-primary-foreground font-medium text-sm disabled:opacity-40"
        >
          <Search className="w-4 h-4 mr-2" />
          Find Routes
        </Button>
      </div>

      {/* Popular Routes */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">POPULAR ROUTES</p>
        <div className="grid grid-cols-2 gap-2">
          {popularMumbaiRoutes.map((route, index) => (
            <button
              key={index}
              onClick={() => {
                setFrom(route.from);
                setTo(route.to);
              }}
              className="border border-border px-3 py-2 text-left hover:bg-secondary transition-colors"
            >
              <p className="text-sm font-medium text-foreground">{route.from} → {route.to}</p>
              <p className="text-2xs text-muted-foreground">{route.label}</p>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
