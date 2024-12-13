import { Play, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

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
  const handleClick = (option: VideoOption, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'A') {
      // Let the link handle the navigation
      return;
    }
    // Otherwise open the video dialog
    onVideoSelect(option.videoId);
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-8 max-w-md mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white text-center mb-4"
      >
        DAILY REWARD
      </motion.h2>
      {options.map((option, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card 
            className="bg-gray-900/60 backdrop-blur-lg border-gray-800 hover:bg-gray-800/60 transition-colors cursor-pointer"
            onClick={(e) => handleClick(option, e)}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  {option.icon}
                </div>
                <a 
                  href={option.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white font-medium hover:text-blue-400 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {option.title}
                </a>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default VideoOptionsGrid;
