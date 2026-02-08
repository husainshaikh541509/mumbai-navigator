import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Share2, Heart, Clock, IndianRupee, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlatCard } from "@/components/ui/flat-card";
import { RouteTimeline } from "@/components/RouteTimeline";
import { BottomNav } from "@/components/BottomNav";

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
    <div className="min-h-screen bg-background pb-24">
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
            <h1 className="text-base font-semibold text-foreground">Route Details</h1>
          </div>
          <button className="p-2 border border-border hover:bg-secondary transition-colors">
            <Heart className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 border border-border hover:bg-secondary transition-colors">
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Route Summary */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-2xl font-bold text-foreground">{routeDetails.departureTime}</p>
              <p className="text-xs text-muted-foreground">{routeDetails.from}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-border" />
              <span className="px-2 py-1 bg-secondary border border-border text-xs text-foreground">
                {routeDetails.totalDuration}
              </span>
              <div className="h-px w-6 bg-border" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{routeDetails.arrivalTime}</p>
              <p className="text-xs text-muted-foreground">{routeDetails.to}</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-px bg-border">
          <div className="bg-background p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Clock className="w-3 h-3" />
            </div>
            <p className="text-sm font-medium text-foreground">{routeDetails.totalDuration}</p>
            <p className="text-2xs text-muted-foreground">Duration</p>
          </div>
          <div className="bg-background p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <IndianRupee className="w-3 h-3" />
            </div>
            <p className="text-sm font-medium text-foreground">₹{routeDetails.totalCost}</p>
            <p className="text-2xs text-muted-foreground">Fare</p>
          </div>
          <div className="bg-background p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <MapPin className="w-3 h-3" />
            </div>
            <p className="text-sm font-medium text-foreground">{routeDetails.distance}</p>
            <p className="text-2xs text-muted-foreground">Distance</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="border-b border-border">
        <div className="h-40 bg-secondary flex items-center justify-center">
          <div className="text-center">
            <Navigation className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Map Preview</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Journey Timeline</h2>
          <span className="text-2xs text-muted-foreground">{routeDetails.steps.length} steps</span>
        </div>
        <FlatCard variant="bordered" className="p-4">
          <RouteTimeline steps={routeDetails.steps} />
        </FlatCard>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background border-t border-border">
        <Button className="w-full h-12 bg-primary text-primary-foreground font-medium text-sm">
          <Navigation className="w-4 h-4 mr-2" />
          Start Navigation
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
