import { Coins, ListTodo, UserPlus, Gift, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";

interface FooterButtonsProps {
  onVideoWatch: () => void;
}

const FooterButtons = ({ onVideoWatch }: FooterButtonsProps) => {
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem("completedTasks");
    return saved ? JSON.parse(saved) : { telegram: false, youtube: false };
  });

  const handleClick = (action: string) => {
    if (action === "Invite") {
      handleInvite();
      return;
    }
    toast({
      title: "Coming Soon",
      description: `${action} feature will be available soon!`,
    });
  };

  const handleVideoClick = () => {
    onVideoWatch();
    toast({
      title: "Reward Earned!",
      description: "You've earned 1,000 coins for watching the video!",
    });
  };

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
    const inviteLink = `${window.location.origin}?ref=${Date.now()}`; // Temporary referral code using timestamp
    
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
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(inviteLink).then(() => {
        toast({
          title: "Link Copied!",
          description: "Share this link with friends. You'll receive 5,000 coins when they join!",
        });
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-game-dark to-transparent p-4">
      <div className="max-w-4xl mx-auto grid grid-cols-5 gap-2">
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 text-game-light hover:text-white hover:bg-game-primary/20"
          onClick={() => handleClick("Earn")}
        >
          <Coins className="h-5 w-5" />
          <span className="text-xs">Earn</span>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 text-game-light hover:text-white hover:bg-game-primary/20"
            >
              <ListTodo className="h-5 w-5" />
              <span className="text-xs">Tasks</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-game-dark text-game-light border-game-primary">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center text-game-light">Daily Tasks</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <a 
                href="https://youtu.be/hriBR6-kc9A?si=wf0z6CSByaLf12qT" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleVideoClick}
                className="block p-4 rounded-lg bg-game-primary/20 hover:bg-game-primary/30 transition-colors cursor-pointer"
              >
                <h3 className="text-lg font-semibold">Watch Daily Video</h3>
                <p className="text-sm text-game-light/80">Earn 1,000 coins by watching today's video</p>
              </a>

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
          className="flex flex-col items-center gap-1 text-game-light hover:text-white hover:bg-game-primary/20"
          onClick={() => handleClick("Invite")}
        >
          <UserPlus className="h-5 w-5" />
          <span className="text-xs">Invite</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 text-game-light hover:text-white hover:bg-game-primary/20"
          onClick={() => handleClick("Drop")}
        >
          <Gift className="h-5 w-5" />
          <span className="text-xs">Drop</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 text-game-light hover:text-white hover:bg-game-primary/20"
          onClick={() => handleClick("Learn")}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-xs">Learn</span>
        </Button>
      </div>
    </div>
  );
};

export default FooterButtons;
