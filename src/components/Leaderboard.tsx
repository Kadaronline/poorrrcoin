import { Trophy, Coins } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  username: string;
  coins: number;
}

interface LeaderboardItemProps {
  data: LeaderboardEntry;
  index: number;
}

const LeaderboardItem = ({ data, index }: LeaderboardItemProps) => {
  const [hovered, setHovered] = useState(false);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  
  const getColor = (position: number) => {
    switch(position) {
      case 0: return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30"; // Gold
      case 1: return "from-gray-300/20 to-gray-400/20 border-gray-300/30"; // Silver
      case 2: return "from-amber-600/20 to-amber-700/20 border-amber-600/30"; // Bronze
      default: return "from-gray-200/10 to-gray-300/10 border-gray-200/20";
    }
  };

  const handleCoinClick = () => {
    setShowCoinAnimation(true);
    setTimeout(() => setShowCoinAnimation(false), 1000);
  };

  return (
    <div
      className={`relative transition-all duration-300 ${
        hovered ? "scale-105" : "scale-100"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`flex items-center justify-between p-6 mb-3 rounded-xl bg-gradient-to-r ${getColor(
          index
        )} backdrop-blur-sm border hover:border-opacity-50 transition-all duration-300`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
            index === 0 ? "bg-yellow-500" :
            index === 1 ? "bg-gray-300" :
            index === 2 ? "bg-amber-600" : "bg-gray-200"
          } text-white font-bold`}>
            {index + 1}
          </div>
          <span className="text-lg font-medium text-white">
            {data.username}
          </span>
        </div>
        <div className="flex items-center gap-2 relative">
          <button
            onClick={handleCoinClick}
            className="text-lg font-semibold text-white bg-white/5 px-4 py-1 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            <Coins className="w-5 h-5 text-yellow-400" />
            {data.coins.toLocaleString()}
          </button>
          
          <AnimatePresence>
            {showCoinAnimation && (
              <motion.div
                initial={{ scale: 0, y: 0, opacity: 0 }}
                animate={{ scale: 1, y: -20, opacity: 1 }}
                exit={{ scale: 0, y: -40, opacity: 0 }}
                className="absolute -top-2 left-1/2 -translate-x-1/2"
              >
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0 }}
                      animate={{ y: [-10, 10] }}
                      transition={{
                        duration: 0.5,
                        repeat: 1,
                        repeatType: "reverse",
                        delay: i * 0.1,
                      }}
                    >
                      <Coins className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('username, coins')
        .order('coins', { ascending: false })
        .limit(3);
      
      if (error) {
        console.error('Error fetching leaderboard:', error);
        return;
      }

      if (data) {
        setLeaders(data);
      }
    };

    fetchLeaders();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('leaderboard_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'leaderboard' 
        }, 
        () => {
          fetchLeaders();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-game-primary/20 to-transparent blur-3xl -z-10" />
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/10">
        <div className="flex items-center mb-8">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
          </div>
        </div>
        <div className="space-y-2">
          {leaders.map((leader, index) => (
            <LeaderboardItem
              key={leader.username}
              data={leader}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;