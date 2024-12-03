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

const FooterButtons = () => {
  const handleClick = (action: string) => {
    toast({
      title: "Coming Soon",
      description: `${action} feature will be available soon!`,
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-game-dark to-transparent p-4">
      <div className="max-w-4xl mx-auto grid grid-cols-4 gap-2">
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
                className="block p-4 rounded-lg bg-game-primary/20 hover:bg-game-primary/30 transition-colors cursor-pointer"
              >
                <h3 className="text-lg font-semibold">Watch Daily Video</h3>
                <p className="text-sm text-game-light/80">Earn 50 coins by watching today's video</p>
              </a>
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
      </div>
    </div>
  );
};

export default FooterButtons;