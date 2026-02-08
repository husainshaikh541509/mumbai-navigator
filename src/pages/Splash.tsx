import { useNavigate } from "react-router-dom";
import { ArrowRight, Train, Bus, TrainFront } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header bar */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <Train className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground tracking-tight">MUMBAI TRANSIT</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        {/* Headline section */}
        <div className="mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
            Multimodal Transit Platform
          </p>
          <h1 className="text-3xl font-bold text-foreground leading-tight mb-4">
            The City is<br />One Ride Away
          </h1>
          <p className="text-sm text-muted-foreground max-w-xs">
            Real-time routes across Mumbai Local, Metro, BEST buses, and cabs. 
            Used by lakhs of daily commuters.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-px bg-border mb-8">
          <div className="bg-background p-4 text-center">
            <p className="text-2xl font-bold text-foreground">12M+</p>
            <p className="text-xs text-muted-foreground">Daily riders</p>
          </div>
          <div className="bg-background p-4 text-center">
            <p className="text-2xl font-bold text-foreground">465</p>
            <p className="text-xs text-muted-foreground">Stations</p>
          </div>
          <div className="bg-background p-4 text-center">
            <p className="text-2xl font-bold text-foreground">7</p>
            <p className="text-xs text-muted-foreground">Lines</p>
          </div>
        </div>

        {/* Transport modes */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Train className="w-4 h-4" />
            <span className="text-xs">Local</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrainFront className="w-4 h-4" />
            <span className="text-xs">Metro</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Bus className="w-4 h-4" />
            <span className="text-xs">BEST</span>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="p-4 border-t border-border space-y-3">
        <Button
          onClick={() => navigate("/home")}
          className="w-full h-12 bg-primary text-primary-foreground font-medium text-sm"
        >
          Start Journey
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        <Button
          onClick={() => navigate("/login")}
          variant="ghost"
          className="w-full h-10 text-muted-foreground hover:text-foreground font-medium text-sm"
        >
          Sign in to sync routes
        </Button>
      </div>
    </div>
  );
}
