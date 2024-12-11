import { useState, useEffect } from "react";
import CoinButton from "@/components/CoinButton";
import CoinBalance from "@/components/CoinBalance";
import Leaderboard from "@/components/Leaderboard";
import FooterButtons from "@/components/FooterButtons";
import { Button } from "@/components/ui/button";
import { Wallet, Coins } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [coins, setCoins] = useState(() => {
    const savedCoins = localStorage.getItem("userCoins");
    return savedCoins ? parseInt(savedCoins) : 0;
  });

  useEffect(() => {
    localStorage.setItem("userCoins", coins.toString());
  }, [coins]);

  const handleTap = () => {
    setCoins((prev) => prev + 1);
  };

  const handleVideoWatch = () => {
    setCoins((prev) => prev + 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden p-4 pb-24">
      {/* Background gradient and shapes */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500 z-0">
        {/* Flowing curves */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-30"
              style={{
                background: `radial-gradient(circle at ${50 + i * 20}% ${100 - i * 10}%, rgba(147, 51, 234, 0.7), transparent)`,
                transform: `translateY(${i * 10}px) scale(${1 + i * 0.2})`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1 + i * 0.2, 1.1 + i * 0.2, 1 + i * 0.2],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Floating orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full bg-purple-300/30 backdrop-blur-sm"
              style={{
                width: `${40 - i * 5}px`,
                height: `${40 - i * 5}px`,
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Top Balance Display */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex-1 flex items-center gap-4">
            <CoinBalance balance={coins} />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-lg"
            >
              <Wallet className="w-6 h-6" />
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Additional Balance Above Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex justify-center mb-4"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-full px-6 py-2 flex items-center gap-2 border border-white/10">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="text-lg font-semibold text-white">
              {coins.toLocaleString()} coins
            </span>
          </div>
        </motion.div>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-12 my-12">
          <CoinButton onTap={handleTap} />
        </div>

        <div className="w-full flex justify-center">
          <Leaderboard />
        </div>
      </div>
      <FooterButtons onVideoWatch={handleVideoWatch} />
    </div>
  );
};

export default Index;