import { useQuery } from "@tanstack/react-query";
import { Star, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Review } from "@shared/schema";
import { motion } from "framer-motion";

interface ReviewListProps {
  mcId: string;
}

export function ReviewList({ mcId }: ReviewListProps) {
  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews", mcId],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ulasan dari Klien</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Belum Ada Ulasan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Jadilah yang pertama memberikan ulasan untuk MC ini.</p>
        </CardContent>
      </Card>
    );
  }

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Ulasan dari Klien
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(parseFloat(averageRating as string))
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold">{averageRating}</span>
            <span className="text-xs text-muted-foreground">({reviews.length})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b pb-4 last:border-0 last:pb-0"
              data-testid={`review-item-${review.id}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="font-semibold text-sm" data-testid={`text-review-name-${review.id}`}>
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="flex gap-1" data-testid={`text-review-rating-${review.id}`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-review-comment-${review.id}`}>
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
