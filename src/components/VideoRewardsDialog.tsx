import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { toast } from "./ui/use-toast";
import { useState, useRef } from "react";

interface VideoRewardsDialogProps {
  onVideoWatch: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
    description: "Watch and get 2,000 coins"
  },
  {
    url: "https://youtu.be/GNq91ZWgGYU?si=0keADA-x2NupVRHb",
    title: "Earning Strategies",
    description: "Watch and get 2,000 coins"
  },
  {
    url: "https://youtu.be/UWhBDCDGhAE?si=uWzVXHCjNtgCm0-P",
    title: "Community Guidelines",
    description: "Watch and get 2,000 coins"
  },
  {
    url: "https://youtu.be/YwBshO8z-U0?si=qIFrSmXPIj-KZz70",
    title: "Advanced Features",
    description: "Watch and get 2,000 coins"
  }
];

export const VideoRewardsDialog = ({ onVideoWatch, open, onOpenChange }: VideoRewardsDialogProps) => {
  const [watchedVideos, setWatchedVideos] = useState<string[]>(() => {
    const saved = localStorage.getItem("watchedVideos");
    return saved ? JSON.parse(saved) : [];
  });
  const watchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const watchStartTimeRef = useRef<number | null>(null);

  const handleVideoStart = (videoUrl: string) => {
    if (watchedVideos.includes(videoUrl)) {
      toast({
        title: "Already Watched",
        description: "You've already earned coins for this video!",
      });
      return;
    }

    // Clear any existing timer
    if (watchTimerRef.current) {
      clearTimeout(watchTimerRef.current);
    }

    // Set start time
    watchStartTimeRef.current = Date.now();

    // Open video in new tab immediately
    window.open(videoUrl, "_blank");

    toast({
      title: "Video Started",
      description: "Watch for at least 1 minute to earn 2,000 coins!",
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
        description: "You've earned 2,000 coins for watching the video!",
      });
    }, 60000); // 1 minute timer
  };

  const handleVideoClose = () => {
    if (watchTimerRef.current) {
      clearTimeout(watchTimerRef.current);
      
      // Calculate watch duration
      if (watchStartTimeRef.current) {
        const watchDuration = Date.now() - watchStartTimeRef.current;
        if (watchDuration < 60000) { // Less than 1 minute
          toast({
            title: "Video Skipped",
            description: "You need to watch for at least 1 minute to earn coins!",
            variant: "destructive",
          });
        }
      }
      
      watchStartTimeRef.current = null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) handleVideoClose();
      onOpenChange(open);
    }}>
      <DialogContent className="bg-game-dark text-game-light border-game-primary max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-game-light">DAILY REWARDS</DialogTitle>
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
              onClick={() => handleVideoStart(video.url)}
            >
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-sm text-game-light/80">{video.description}</p>
              {watchedVideos.includes(video.url) && (
                <span className="text-xs text-green-400 mt-2 block">✓ Completed</span>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};