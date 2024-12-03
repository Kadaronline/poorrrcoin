import { Trophy } from "lucide-react";

const mockLeaders = [
  { username: "Player1", coins: 1500 },
  { username: "Player2", coins: 1200 },
  { username: "Player3", coins: 800 },
];

const Leaderboard = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 w-full max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Leaderboard</h2>
      </div>
      <div className="space-y-2">
        {mockLeaders.map((leader, index) => (
          <div
            key={leader.username}
            className="flex items-center justify-between p-2 rounded-lg bg-white/5"
          >
            <div className="flex items-center gap-2">
              <span className="text-white/80 w-6">{index + 1}</span>
              <span className="text-white font-medium">{leader.username}</span>
            </div>
            <span className="text-game-primary font-bold">
              {leader.coins.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;