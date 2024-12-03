import { motion } from "framer-motion";

interface CoinBalanceProps {
  balance: number;
}

const CoinBalance = ({ balance }: CoinBalanceProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/20 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg"
    >
      <span className="text-2xl font-bold text-white">
        {balance.toLocaleString()} coins
      </span>
    </motion.div>
  );
};

export default CoinBalance;