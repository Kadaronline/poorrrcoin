import { useState } from "react";
import CoinButton from "@/components/CoinButton";
import CoinBalance from "@/components/CoinBalance";
import Leaderboard from "@/components/Leaderboard";
import FooterButtons from "@/components/FooterButtons";

const Index = () => {
  const [coins, setCoins] = useState(0);

  const handleTap = () => {
    setCoins((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-dark to-game-secondary p-4 pb-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        <div className="w-full flex justify-center mt-8">
          <CoinBalance balance={coins} />
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-12 my-12">
          <CoinButton onTap={handleTap} />
        </div>

        <div className="w-full flex justify-center">
          <Leaderboard />
        </div>
      </div>
      <FooterButtons onVideoWatch={() => setCoins(prev => prev + 1000)} />
    </div>
  );
};

export default Index;