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
    <div className="min-h-screen bg-[#0A0E17] relative overflow-hidden p-4 pb-24">
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px bg-[#00E6FF]/20"
              style={{
                width: '200px',
                transform: `rotate(${45 + i * 15}deg)`,
                left: `${20 + i * 10}%`,
                top: `${10 + i * 15}%`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          ))}
        </div>
        
        {/* Squares */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`square-${i}`}
            className="absolute border border-[#00E6FF]/30"
            style={{
              width: `${40 - i * 8}px`,
              height: `${40 - i * 8}px`,
              left: `${30 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
            initial={{ opacity: 0, rotate: 45 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              rotate: [45, 90, 45]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
        
        {/* Grid patterns */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={`grid-${i}`}
              className="absolute border-r border-[#00E6FF]/20"
              style={{
                height: '100%',
                width: '1px',
                left: `${i * 12.5}%`
              }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <div
              key={`grid-horizontal-${i}`}
              className="absolute border-b border-[#00E6FF]/20"
              style={{
                width: '100%',
                height: '1px',
                top: `${i * 12.5}%`
              }}
            />
          ))}
        </div>
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