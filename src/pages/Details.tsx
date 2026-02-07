import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Share2, Heart, Clock, IndianRupee, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { RouteTimeline } from "@/components/RouteTimeline";
import { BottomNav } from "@/components/BottomNav";

// Mock detailed route data
const routeDetails = {
  id: "1",
  from: "Churchgate",
  to: "Andheri",
  totalDuration: "45 min",
  totalCost: 35,
  departureTime: "8:30 AM",
  arrivalTime: "9:15 AM",
  distance: "24 km",
  steps: [
    {
      mode: "metro" as const,
      from: "Churchgate Station",
      to: "Marine Lines",
      departureTime: "8:30 AM",
      arrivalTime: "8:34 AM",
      duration: "4 min",
      line: "Western Line",
      platform: "1",
      instructions: "Board Western Line train towards Virar",
    },
    {
      mode: "metro" as const,
      from: "Marine Lines",
      to: "Charni Road",
      departureTime: "8:34 AM",
      arrivalTime: "8:37 AM",
      duration: "3 min",
      line: "Western Line",
    },
    {
      mode: "metro" as const,
      from: "Charni Road",
      to: "Andheri",
      departureTime: "8:37 AM",
      arrivalTime: "9:08 AM",
      duration: "31 min",
      line: "Western Line",
      instructions: "Continue on Western Line",
    },
    {
      mode: "walk" as const,
      from: "Andheri Station",
      to: "Andheri",
      departureTime: "9:08 AM",
      arrivalTime: "9:15 AM",
      duration: "7 min",
      instructions: "Walk to destination via East Exit",
    },
  ],
};

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen gradient-mesh pb-32">
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
            <h1 className="text-xl font-bold text-foreground">Route Details</h1>
          </div>
          <button className="w-10 h-10 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors">
            <Heart className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-10 h-10 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors">
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </motion.div>

      {/* Route Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-4 mb-6"
      >
        <GlassCard className="p-5" glow>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-3xl font-bold text-foreground">
                  {routeDetails.departureTime}
                </p>
                <p className="text-sm text-muted-foreground">{routeDetails.from}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-8 bg-border" />
                <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
                  <span className="text-xs font-medium text-primary">
                    {routeDetails.totalDuration}
                  </span>
                </div>
                <div className="h-0.5 w-8 bg-border" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground">
                  {routeDetails.arrivalTime}
                </p>
                <p className="text-sm text-muted-foreground">{routeDetails.to}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{routeDetails.totalDuration}</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">₹{routeDetails.totalCost}</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{routeDetails.distance}</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Map Preview Placeholder */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4 mb-6"
      >
        <GlassCard className="h-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-primary/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Map Preview</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-4"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Journey Timeline</h2>
        <GlassCard className="p-5">
          <RouteTimeline steps={routeDetails.steps} />
        </GlassCard>
      </motion.div>

      {/* Bottom Action */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-glow hover:shadow-glow hover:scale-[1.02] transition-all duration-200">
          <Navigation className="w-5 h-5 mr-2" />
          Start Navigation
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
