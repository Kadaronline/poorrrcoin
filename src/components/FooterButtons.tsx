import { Coins, ListTodo, UserPlus, Gift } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

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
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 text-game-light hover:text-white hover:bg-game-primary/20"
          onClick={() => handleClick("Tasks")}
        >
          <ListTodo className="h-5 w-5" />
          <span className="text-xs">Tasks</span>
        </Button>
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