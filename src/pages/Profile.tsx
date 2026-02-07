import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Settings, 
  ChevronRight, 
  Train, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  History,
  Heart,
  MapPin
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
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
            <h1 className="text-xl font-bold text-foreground">Profile</h1>
          </div>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-4 mb-6"
      >
        <GlassCard className="p-5" glow>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">JD</span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">John Doe</h2>
              <p className="text-sm text-muted-foreground">john.doe@email.com</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                  Premium
                </span>
                <span className="text-xs text-muted-foreground">
                  Member since Jan 2024
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">127</p>
              <p className="text-xs text-muted-foreground">Trips</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">₹4.2K</p>
              <p className="text-xs text-muted-foreground">Saved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">85</p>
              <p className="text-xs text-muted-foreground">Hours</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Recent Trips */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Trips</h3>
          <button className="text-sm text-primary hover:underline">View All</button>
        </div>

        <div className="space-y-3">
          {tripHistory.map((trip, index) => (
            <GlassCard key={index} variant="interactive" className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Train className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {trip.from} → {trip.to}
                    </p>
                    <p className="text-xs text-muted-foreground">{trip.date}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">₹{trip.cost}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Menu Items */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-4 mb-6"
      >
        <GlassCard className="divide-y divide-border/50">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </GlassCard>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="px-4"
      >
        <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </motion.div>

      <BottomNav />
    </div>
  );
}
