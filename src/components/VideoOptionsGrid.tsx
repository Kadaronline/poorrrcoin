import { Play, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface VideoOption {
  title: string;
  icon: React.ReactNode;
  videoId: string;
  url: string;
}

interface VideoOptionsGridProps {
  options: VideoOption[];
  onVideoSelect: (videoId: string) => void;
}

const VideoOptionsGrid = ({ options, onVideoSelect }: VideoOptionsGridProps) => {
  const handleClick = (option: VideoOption) => {
    window.open(option.url, '_blank');
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-8 max-w-xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white text-center mb-4"
      >
        DAILY REWARDS
      </motion.h2>
      {options.map((option, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => handleClick(option)}
          className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
        >
          <div className="relative flex items-center bg-gradient-to-r from-black via-[#FF1493] to-[#FF69B4] rounded-full overflow-hidden group hover:shadow-lg hover:shadow-pink-500/20">
            <div className="absolute left-0 w-12 h-12 md:w-16 md:h-16 bg-pink-600 flex items-center justify-center">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div className="ml-16 md:ml-20 py-2 md:py-4 pr-4 md:pr-6">
              <h3 className="text-base md:text-xl font-bold text-white uppercase tracking-wide">
                WATCH AND GET REWARD
              </h3>
              <p className="text-sm md:text-lg text-white/90">
                Get 2,000 poor Coin's
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VideoOptionsGrid;