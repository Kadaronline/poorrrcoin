import { Trophy } from "lucide-react";
import { useState } from "react";

const mockLeaders = [
  { username: "Player1", coins: 1500 },
  { username: "Player2", coins: 1200 },
  { username: "Player3", coins: 800 },
];

interface LeaderboardItemProps {
  data: { username: string; coins: number };
  index: number;
}

const LeaderboardItem = ({ data, index }: LeaderboardItemProps) => {
  const [hovered, setHovered] = useState(false);
  
  const getColor = (position: number) => {
    switch(position) {
      case 0: return "bg-yellow-500"; // Gold
      case 1: return "bg-gray-300"; // Silver
      case 2: return "bg-amber-600"; // Bronze
      default: return "bg-gray-200";
    }
  };

  return (
    <div
      className={`relative transition-transform duration-200 ${
        hovered ? "scale-105" : "scale-100"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`flex items-center justify-between p-4 mb-2 rounded-lg backdrop-blur-sm ${getColor(
          index
        )} bg-opacity-20 border border-white/10`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-white">
            {index + 1}.
          </span>
          <span className="text-lg text-white">
            {data.username}
          </span>
        </div>
        <span className="text-lg font-semibold text-game-primary">
          {data.coins.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 w-full max-w-md">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Leaderboard</h2>
      </div>
      <div className="space-y-2">
        {mockLeaders.map((leader, index) => (
          <LeaderboardItem
            key={leader.username}
            data={leader}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;