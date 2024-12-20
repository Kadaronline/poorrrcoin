import { Coins, ListTodo, UserPlus, Gift } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { VideoRewardsDialog } from "./VideoRewardsDialog";

interface FooterButtonsProps {
  onVideoWatch: () => void;
}

const FooterButtons = ({ onVideoWatch }: FooterButtonsProps) => {
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem("completedTasks");
    return saved ? JSON.parse(saved) : { telegram: false, youtube: false };
  });
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);

  const handleSubscribe = (platform: 'telegram' | 'youtube') => {
    const links = {
      telegram: 'https://t.me/kadaronline',
      youtube: 'https://youtube.com/@kadaronline?si=npGBDxCDfpm4Ivsu'
    };

    window.open(links[platform], '_blank');
    
    const newCompletedTasks = { ...completedTasks, [platform]: true };
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem("completedTasks", JSON.stringify(newCompletedTasks));

    onVideoWatch();
    toast({
      title: "Reward Earned!",
      description: `You've earned 1,000 coins for subscribing to our ${platform} channel!`,
    });
  };

  const handleInvite = () => {
    const referralCode = Date.now().toString();
    const baseUrl = window.location.protocol + '//' + window.location.hostname;
    const inviteLink = `${baseUrl}?ref=${referralCode}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Join Poor Coin!',
        text: 'Join Poor Coin and we both get 5,000 coins! 🎉',
        url: inviteLink
      }).then(() => {
        toast({
          title: "Link Shared!",
          description: "You'll receive 5,000 coins when your friend joins!",
        });
      }).catch(() => {
        // Handle share error silently
      });
    } else {
      navigator.clipboard.writeText(inviteLink).then(() => {
        toast({
          title: "Link Copied!",
          description: "Share this link with friends. You'll receive 5,000 coins when they join!",
        });
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black p-4">
      <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4">
        <Dialog>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-2 text-white hover:text-white hover:bg-game-primary/20 transform hover:-translate-y-1 transition-all duration-200 p-6 rounded-xl bg-black border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
            onClick={() => setIsVideoDialogOpen(true)}
          >
            <Coins className="h-8 w-8" />
            <span className="text-sm font-semibold">Earn</span>
          </Button>
        </Dialog>

        <VideoRewardsDialog 
          open={isVideoDialogOpen}
          onOpenChange={setIsVideoDialogOpen}
          onVideoWatch={onVideoWatch}
        />

        <Dialog>
          <DialogContent className="bg-black text-game-light border-game-primary">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center text-game-light">Daily Tasks</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              {!completedTasks.telegram && (
                <div 
                  onClick={() => handleSubscribe('telegram')}
                  className="block p-4 rounded-lg bg-game-primary/20 hover:bg-game-primary/30 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-semibold">Join Telegram Channel</h3>
                  <p className="text-sm text-game-light/80">Earn 1,000 coins by joining our Telegram channel</p>
                </div>
              )}

              {!completedTasks.youtube && (
                <div 
                  onClick={() => handleSubscribe('youtube')}
                  className="block p-4 rounded-lg bg-game-primary/20 hover:bg-game-primary/30 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-semibold">Subscribe to YouTube</h3>
                  <p className="text-sm text-game-light/80">Earn 1,000 coins by subscribing to our YouTube channel</p>
                </div>
              )}

              {completedTasks.telegram && completedTasks.youtube && (
                <div className="p-4 rounded-lg bg-green-500/20 text-center">
                  <h3 className="text-lg font-semibold">All Tasks Completed!</h3>
                  <p className="text-sm text-game-light/80">Great job! Check back later for more tasks.</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="ghost"
          className="flex flex-col items-center gap-2 text-white hover:text-white hover:bg-game-primary/20 transform hover:-translate-y-1 transition-all duration-200 p-6 rounded-xl bg-black border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
          onClick={handleInvite}
        >
          <UserPlus className="h-8 w-8" />
          <span className="text-sm font-semibold">Invite</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col items-center gap-2 text-white hover:text-white hover:bg-game-primary/20 transform hover:-translate-y-1 transition-all duration-200 p-6 rounded-xl bg-black border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
          onClick={() => {
            toast({
              title: "Coming Soon",
              description: "Drop feature will be available soon!",
            });
          }}
        >
          <Gift className="h-8 w-8" />
          <span className="text-sm font-semibold">Drop</span>
        </Button>
      </div>
    </div>
  );
};

export default FooterButtons;