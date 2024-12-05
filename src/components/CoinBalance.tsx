import { motion } from "framer-motion";
import { Coins } from "lucide-react";

interface CoinBalanceProps {
  balance: number;
}

const CoinBalance = ({ balance }: CoinBalanceProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg flex items-center gap-2 hover:bg-white/20 transition-colors"
    >
      <Coins className="w-6 h-6 text-yellow-400" />
      <span className="text-2xl font-bold text-white">
        {balance.toLocaleString()}
      </span>
    </motion.div>
  );
};

export default CoinBalance;