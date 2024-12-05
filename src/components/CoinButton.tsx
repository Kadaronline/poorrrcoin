import { motion } from "framer-motion";

interface CoinButtonProps {
  onTap: () => void;
}

const CoinButton = ({ onTap }: CoinButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onTap}
      className="w-48 h-48 rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 focus:outline-none"
    >
      <img
        src="/lovable-uploads/26331f82-cb1d-4e99-bc17-3a0a78023dfb.png"
        alt="Poor Coin Logo"
        className="w-full h-full object-cover"
      />
    </motion.button>
  );
};

export default CoinButton;