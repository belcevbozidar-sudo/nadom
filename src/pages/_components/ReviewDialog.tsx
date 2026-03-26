import { useState } from "react";
import { Star } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";

type ReviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ReviewDialog({ open, onOpenChange }: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createReview = useMutation(api.reviews.createReview);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Моля, изберете оценка.");
      return;
    }
    if (comment.trim().length === 0) {
      toast.error("Моля, напишете коментар.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createReview({ rating, comment });
      toast.success("Благодарим за вашето ревю!");
      setRating(0);
      setComment("");
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ConvexError) {
        const { message } = error.data as { code: string; message: string };
        toast.error(message);
      } else {
        toast.error("Възникна грешка. Моля, опитайте отново.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[oklch(0.18_0.06_250)] border-white/15 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">
            Оставете ревю
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Споделете вашето мнение за нашите услуги
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Star rating */}
          <div>
            <p className="text-sm text-white/70 mb-3">Вашата оценка</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110 cursor-pointer"
                >
                  <Star
                    className={`size-8 transition-colors ${
                      star <= displayRating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-transparent text-white/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <p className="text-sm text-white/70 mb-3">Вашият коментар</p>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Напишете вашия коментар тук..."
              rows={4}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-white/40 mt-1 text-right">
              {comment.length}/500
            </p>
          </div>

          {/* Submit button */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0 || comment.trim().length === 0}
            className="w-full bg-white text-[oklch(0.20_0.06_250)] hover:bg-white/90 font-bold"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-4" />
                Изпращане...
              </span>
            ) : (
              "Изпратете ревю"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
