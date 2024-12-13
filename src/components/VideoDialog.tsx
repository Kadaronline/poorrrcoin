import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoDialogProps {
  videoId: string | null;
  onClose: () => void;
}

const VideoDialog = ({ videoId, onClose }: VideoDialogProps) => {
  return (
    <Dialog open={!!videoId} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 bg-black">
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={videoId ? `https://www.youtube.com/embed/${videoId}` : ''}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;