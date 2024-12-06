import { useState, useEffect } from "react";
import CoinButton from "@/components/CoinButton";
import CoinBalance from "@/components/CoinBalance";
import Leaderboard from "@/components/Leaderboard";
import FooterButtons from "@/components/FooterButtons";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-black p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <CoinBalance balance={coins} />
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <Wallet className="w-6 h-6" />
            </Button>
          </div>
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