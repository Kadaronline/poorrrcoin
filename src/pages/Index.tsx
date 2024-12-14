import { useState, useEffect } from "react";
import CoinButton from "@/components/CoinButton";
import CoinBalance from "@/components/CoinBalance";
import FooterButtons from "@/components/FooterButtons";
import { Button } from "@/components/ui/button";
import { Wallet, Coins, Play } from "lucide-react";
import { motion } from "framer-motion";
import VideoOptionsGrid from "@/components/VideoOptionsGrid";
import VideoDialog from "@/components/VideoDialog";

const Index = () => {
  const [coins, setCoins] = useState(() => {
    const savedCoins = localStorage.getItem("userCoins");
    return savedCoins ? parseInt(savedCoins) : 0;
  });

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("userCoins", coins.toString());
  }, [coins]);

  const handleTap = () => {
    setCoins((prev) => prev + 1);
  };

  const handleVideoWatch = () => {
    setCoins((prev) => prev + 2000); // Updated to 2,000 coins
  };

  const options = [
    {
      title: "Top-10 Ways to Earn Coins",
      icon: <Play className="w-8 h-8 text-red-500" />,
      videoId: "QeytleILFqY",
      url: "https://youtu.be/QeytleILFqY",
    },
    {
      title: "Daily Rewards Guide",
      icon: <Play className="w-8 h-8 text-red-500" />,
      videoId: "QeytleILFqY",
      url: "https://youtu.be/QeytleILFqY",
    },
    {
      title: "Special Events Calendar",
      icon: <Play className="w-8 h-8 text-red-500" />,
      videoId: "QeytleILFqY",
      url: "https://youtu.be/QeytleILFqY",
    },
    {
      title: "Community Challenges",
      icon: <Play className="w-8 h-8 text-red-500" />,
      videoId: "QeytleILFqY",
      url: "https://youtu.be/QeytleILFqY",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden p-4 pb-24">
      {/* Background gradient and waves */}
      <div className="fixed inset-0 bg-[#000033] z-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Deep blue waves */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-full"
              style={{
                background: `radial-gradient(ellipse at ${50 + i * 20}% ${40 + i * 15}%, rgba(0, 0, 255, 0.15), transparent)`,
                transform: `scale(${1 + i * 0.2})`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Curved lines */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`curve-${i}`}
              className="absolute w-full h-full opacity-20"
              style={{
                background: `linear-gradient(${45 + i * 45}deg, transparent, rgba(0, 0, 255, 0.3) ${50 + i * 10}%, transparent)`,
                borderRadius: "50%",
                transform: `scale(${1.2 + i * 0.1}) rotate(${i * 45}deg)`,
              }}
              animate={{
                rotate: [i * 45, (i + 1) * 45, i * 45],
                scale: [1.2 + i * 0.1, 1.3 + i * 0.1, 1.2 + i * 0.1],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Glowing orbs */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${100 - i * 20}px`,
                height: `${100 - i * 20}px`,
                background: "radial-gradient(circle, rgba(0, 0, 255, 0.2), transparent)",
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Sticky Footer Buttons at top */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-[#000033] to-transparent pb-4">
        <div className="max-w-4xl mx-auto">
          <FooterButtons onVideoWatch={handleVideoWatch} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 mt-4">
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

        <VideoOptionsGrid options={options} onVideoSelect={setSelectedVideo} />
      </div>

      <VideoDialog videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
};

export default Index;
