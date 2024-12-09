import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, Download } from "lucide-react";
import { toast } from "sonner";

const WalletDialog = () => {
  const handleWalletConnect = (type: 'tonkeeper' | 'telegram') => {
    // Check if TonKeeper is installed (this is a basic check, you might want to enhance it)
    const isTonKeeperInstalled = 'tonkeeper' in window;
    
    if (type === 'tonkeeper' && !isTonKeeperInstalled) {
      // If TonKeeper is not installed, show download prompt
      window.open('https://tonkeeper.com/download', '_blank');
      toast.info("Please install TonKeeper wallet to continue");
      return;
    }

    // Handle wallet connection based on type
    if (type === 'tonkeeper') {
      // Add actual TonKeeper connection logic here
      console.log('Connecting to TonKeeper...');
      toast.success("Connecting to TonKeeper...");
    } else {
      // Add actual Telegram wallet connection logic here
      console.log('Connecting to Telegram wallet...');
      toast.success("Connecting to Telegram wallet...");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-lg"
        >
          <Wallet className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-game-dark to-game-primary/90 border-none text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-white">Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Button
            onClick={() => handleWalletConnect('tonkeeper')}
            className="bg-white/10 hover:bg-white/20 text-white p-6 flex items-center justify-between group transition-all duration-300 border border-white/10"
          >
            <span className="text-lg font-semibold">TonKeeper</span>
            <Download className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
          <Button
            onClick={() => handleWalletConnect('telegram')}
            className="bg-white/10 hover:bg-white/20 text-white p-6 flex items-center justify-between group transition-all duration-300 border border-white/10"
          >
            <span className="text-lg font-semibold">Telegram Wallet</span>
            <Download className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletDialog;
