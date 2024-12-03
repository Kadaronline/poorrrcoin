import { useState } from "react";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";

interface CoinButtonProps {
  onTap: () => void;
}

const CoinButton = ({ onTap }: CoinButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTap = () => {
    setIsPressed(true);
    onTap();
    setTimeout(() => setIsPressed(false), 100);
  };

  return (
    <motion.button
      className="w-32 h-32 rounded-full bg-gradient-to-br from-game-primary to-game-secondary shadow-lg flex items-center justify-center cursor-pointer"
      whileTap={{ scale: 0.95 }}
      onClick={handleTap}
    >
      <Coins className={`w-16 h-16 text-white ${isPressed ? "animate-pop" : "animate-float"}`} />
    </motion.button>
  );
};

export default CoinButton;