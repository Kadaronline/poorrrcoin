import { Coins, ListTodo, UserPlus, Gift } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState, useRef } from "react";

interface FooterButtonsProps {
  onVideoWatch: () => void;
}

interface VideoInfo {
  url: string;
  title: string;
  description: string;
}

const videos: VideoInfo[] = [
  {
    url: "https://youtu.be/QeytleILFqY?si=JeuBGq0oDQo5qpfz",
    title: "Introduction to Poor Coin",
    description: "Learn the basics of Poor Coin and how to get started"
  },
  {
    url: "https://youtu.be/GNq91ZWgGYU?si=0keADA-x2NupVRHb",
    title: "Earning Strategies",
    description: "Discover effective ways to earn more Poor Coins"
  },
  {
    url: "https://youtu.be/UWhBDCDGhAE?si=uWzVXHCjNtgCm0-P",
    title: "Community Guidelines",
    description: "Understanding our community rules and best practices"
  },
  {
    url: "https://youtu.be/YwBshO8z-U0?si=qIFrSmXPIj-KZz70",
    title: "Advanced Features",
    description: "Explore advanced features and earning opportunities"
  }
];

const FooterButtons = ({ onVideoWatch }: FooterButtonsProps) => {
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem("completedTasks");
    return saved ? JSON.parse(saved) : { telegram: false, youtube: false };
  });
  const [watchedVideos, setWatchedVideos] = useState<string[]>(() => {
    const saved = localStorage.getItem("watchedVideos");
    return saved ? JSON.parse(saved) : [];
  });
  const watchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (action: string) => {
    if (action === "Invite") {
      handleInvite();
      return;
    }
    if (action === "Earn") {
      return; // Dialog will handle this
    }
    toast({
      title: "Coming Soon",
      description: `${action} feature will be available soon!`,
    });
  };

  const handleVideoStart = (videoUrl: string) => {
    if (watchedVideos.includes(videoUrl)) {
      toast({
        title: "Already Watched",
        description: "You've already earned coins for this video!",
      });
      return;
    }

    toast({
      title: "Video Started",
      description: "Watch for at least 1 minute to earn 500 coins!",
    });

    // Start the timer
    watchTimerRef.current = setTimeout(() => {
      // Add video to watched list
      const newWatchedVideos = [...watchedVideos, videoUrl];
      setWatchedVideos(newWatchedVideos);
      localStorage.setItem("watchedVideos", JSON.stringify(newWatchedVideos));
      
      // Award coins
      onVideoWatch();
      toast({
        title: "Reward Earned!",
        description: "You've earned 500 coins for watching the video!",
      });
    }, 60000); // 1 minute timer
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
    // Generate a simple referral code using timestamp
    const referralCode = Date.now().toString();
    // Create the invite link using the current hostname without any port
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
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A192F] to-transparent p-4">
      <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-2 text-white hover:text-white hover:bg-game-primary/20 transform hover:-translate-y-1 transition-all duration-200 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
            >
              <Coins className="h-8 w-8" />
              <span className="text-sm font-semibold">Earn</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-game-dark text-game-light border-game-primary max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center text-game-light">Earn Coins</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    watchedVideos.includes(video.url)
                      ? "bg-green-500/20"
                      : "bg-game-primary/20 hover:bg-game-primary/30"
                  } transition-colors cursor-pointer`}
                  onClick={() => {
                    window.open(video.url, "_blank");
                    handleVideoStart(video.url);
                  }}
                >
                  <h3 className="text-lg font-semibold">{video.title}</h3>
                  <p className="text-sm text-game-light/80">{video.description}</p>
                  {watchedVideos.includes(video.url) && (
                    <span className="text-xs text-green-400 mt-2 block">✓ Completed</span>
                  )}
                </div>
              ))}

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
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-2 text-white hover:text-white hover:bg-game-primary/20 transform hover:-translate-y-1 transition-all duration-200 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
            >
              <ListTodo className="h-8 w-8" />
              <span className="text-sm font-semibold">Tasks</span>
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
          className="flex flex-col items-center gap-2 text-white hover:text-white hover:bg-game-primary/20 transform hover:-translate-y-1 transition-all duration-200 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
          onClick={() => handleClick("Invite")}
        >
          <UserPlus className="h-8 w-8" />
          <span className="text-sm font-semibold">Invite</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col items-center gap-2 text-white hover:text-white hover:bg-game-primary/20 transform hover:-translate-y-1 transition-all duration-200 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
          onClick={() => handleClick("Drop")}
        >
          <Gift className="h-8 w-8" />
          <span className="text-sm font-semibold">Drop</span>
        </Button>
      </div>
    </div>
  );
};

export default FooterButtons;