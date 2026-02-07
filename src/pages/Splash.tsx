import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Train, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-mesh flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-40 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
            <Train className="w-12 h-12 text-primary-foreground" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold text-foreground text-center mb-4"
        >
          Mumbai
          <span className="text-gradient"> Commute</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-muted-foreground text-center max-w-xs mb-12"
        >
          Your smart companion for navigating Mumbai's transit network
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-8 mb-16"
        >
          {[
            { icon: MapPin, label: "Multi-modal" },
            { icon: Clock, label: "Real-time" },
            { icon: Train, label: "All Modes" },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">{feature.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="px-6 pb-12 relative z-10 space-y-4"
      >
        <Button
          onClick={() => navigate("/login")}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-glow hover:shadow-glow hover:scale-[1.02] transition-all duration-200"
        >
          Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <Button
          onClick={() => navigate("/home")}
          variant="ghost"
          className="w-full h-14 rounded-2xl text-muted-foreground hover:text-foreground font-medium"
        >
          Continue as Guest
        </Button>
      </motion.div>
    </div>
  );
}
