import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import mumbaiSkyline from "@/assets/mumbai-skyline.png";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Full-screen dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,50%,8%)] via-[hsl(222,47%,6%)] to-[hsl(220,60%,4%)]" />
      
      {/* Animated ambient glow effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
      </motion.div>

      {/* Mumbai Skyline - Animated */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-end justify-center"
      >
        <motion.img
          src={mumbaiSkyline}
          alt="Mumbai Skyline"
          className="w-full h-auto max-h-[70vh] object-cover object-top"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 pb-12">
        {/* Tagline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-8"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm font-medium text-primary tracking-widest uppercase mb-4"
          >
            Mumbai Commute
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6"
          >
            The City is
            <br />
            <span className="text-gradient">One Ride Away</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-muted-foreground text-lg max-w-xs mx-auto"
          >
            Navigate Mumbai's transit network with ease
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="space-y-4"
        >
          <Button
            onClick={() => navigate("/home")}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-glow hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:scale-[1.02] transition-all duration-300 group"
          >
            Start Journey
            <motion.span
              className="ml-2 inline-flex"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Button>

          <Button
            onClick={() => navigate("/login")}
            variant="ghost"
            className="w-full h-12 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 font-medium transition-all duration-200"
          >
            Already have an account? Sign In
          </Button>
        </motion.div>

        {/* Bottom indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex justify-center mt-8"
        >
          <div className="flex gap-1.5">
            <div className="w-6 h-1.5 rounded-full bg-primary" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
