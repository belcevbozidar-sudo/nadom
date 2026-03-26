import { useState } from "react";
import { motion } from "motion/react";
import { Star, MessageSquarePlus, Quote } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import ReviewDialog from "./ReviewDialog.tsx";

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-4 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-white/20"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewsContent() {
  const reviews = useQuery(api.reviews.getVisibleReviews, {});
  const [dialogOpen, setDialogOpen] = useState(false);

  if (reviews === undefined) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-48 w-full rounded-2xl bg-white/10"
          />
        ))}
      </div>
    );
  }

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <>
      {/* Stats bar */}
      {reviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold text-white">
              {avgRating.toFixed(1)}
            </span>
            <div>
              <StarDisplay rating={Math.round(avgRating)} />
              <p className="text-xs text-white/50 mt-0.5">
                {reviews.length} {reviews.length === 1 ? "ревю" : "ревюта"}
              </p>
            </div>
          </div>

          <Authenticated>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-white/15 text-white border border-white/20 hover:bg-white/25 gap-2"
            >
              <MessageSquarePlus className="size-4" />
              Оставете ревю
            </Button>
          </Authenticated>
          <Unauthenticated>
            <SignInButton
              signInText="Влезте, за да оставите ревю"
              size="sm"
              className="bg-white/15 text-white border-white/20 hover:bg-white/25"
            />
          </Unauthenticated>
        </motion.div>
      )}

      {/* Reviews grid */}
      {reviews.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-16"
        >
          <Quote className="size-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 text-lg mb-6">
            Все още няма ревюта. Бъдете първият!
          </p>
          <Authenticated>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-white text-[oklch(0.20_0.06_250)] hover:bg-white/90 font-bold gap-2"
            >
              <MessageSquarePlus className="size-4" />
              Напишете ревю
            </Button>
          </Authenticated>
          <Unauthenticated>
            <SignInButton
              signInText="Влезте, за да оставите ревю"
              size="default"
              className="bg-white/15 text-white border-white/20 hover:bg-white/25"
            />
          </Unauthenticated>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 150, damping: 20 },
                },
              }}
              className="relative p-6 rounded-2xl bg-white/8 backdrop-blur-md border border-white/12 hover:border-white/25 transition-all duration-300 group"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 size-6 text-white/8 group-hover:text-white/15 transition-colors" />

              {/* Stars */}
              <StarDisplay rating={review.rating} />

              {/* Comment */}
              <p className="text-white/80 text-sm leading-relaxed mt-4 mb-4 line-clamp-4">
                {review.comment}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white font-bold text-sm">
                  {review.authorName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-white/70">
                  {review.authorName}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <ReviewDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}

export default function ReviewsSection() {
  return (
    <section id="ревюта" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            ОТЗИВИ НА КЛИЕНТИ
          </h2>
          <motion.div
            className="w-16 h-1 bg-white mt-4 rounded-full origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>

        <ReviewsContent />
      </div>
    </section>
  );
}
