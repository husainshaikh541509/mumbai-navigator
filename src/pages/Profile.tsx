import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ChevronRight, 
  Train, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  History,
  Heart,
  Settings
} from "lucide-react";
import { FlatCard } from "@/components/ui/flat-card";
import { BottomNav } from "@/components/BottomNav";

const tripHistory = [
  { from: "Churchgate", to: "Andheri", date: "Today, 8:30 AM", cost: 35 },
  { from: "Bandra", to: "CST", date: "Yesterday, 6:15 PM", cost: 25 },
  { from: "Dadar", to: "Thane", date: "Feb 5, 9:00 AM", cost: 40 },
];

const menuItems = [
  { icon: History, label: "Trip History", path: "/history" },
  { icon: Heart, label: "Saved Routes", path: "/saved" },
  { icon: CreditCard, label: "Payment Methods", path: "/payments" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function Profile() {
  const navigate = useNavigate();

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
          <h1 className="text-base font-semibold text-foreground">Profile</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">JD</span>
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-foreground">John Doe</h2>
            <p className="text-xs text-muted-foreground">john.doe@email.com</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-primary/20 text-primary text-2xs font-medium border border-primary/30">
                Premium
              </span>
              <span className="text-2xs text-muted-foreground">Since Jan 2024</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-border">
          <div className="bg-background p-3 text-center">
            <p className="text-lg font-bold text-foreground">127</p>
            <p className="text-2xs text-muted-foreground">Trips</p>
          </div>
          <div className="bg-background p-3 text-center">
            <p className="text-lg font-bold text-foreground">₹4.2K</p>
            <p className="text-2xs text-muted-foreground">Saved</p>
          </div>
          <div className="bg-background p-3 text-center">
            <p className="text-lg font-bold text-foreground">85</p>
            <p className="text-2xs text-muted-foreground">Hours</p>
          </div>
        </div>
      </div>

      {/* Recent Trips */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 bg-secondary/30">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Recent Trips</h3>
          <button className="text-xs text-primary hover:underline">View All</button>
        </div>

        <div className="divide-y divide-border">
          {tripHistory.map((trip, index) => (
            <div key={index} className="px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary border border-border">
                    <Train className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{trip.from} → {trip.to}</p>
                    <p className="text-2xs text-muted-foreground">{trip.date}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">₹{trip.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="divide-y divide-border">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-destructive/50 text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
