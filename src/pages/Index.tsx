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
    setCoins((prev) => prev + 500); // Changed from 1000 to 500 coins
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#233554] relative overflow-hidden p-4 pb-24">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-game-primary/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.05, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-game-secondary/10 blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto relative">
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