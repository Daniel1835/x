import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import type { Article } from "@shared/schema";
import { motion } from "framer-motion";

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="group hover-elevate overflow-visible transition-all duration-300" data-testid={`card-article-${article.id}`}>
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={article.publishedAt}>{formattedDate}</time>
          </div>
          
          <Link href={`/blog/${article.id}`}>
            <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors" data-testid={`text-article-title-${article.id}`}>
              {article.title}
            </h3>
          </Link>
          
          <p className="text-sm text-muted-foreground line-clamp-3">
            {article.excerpt}
          </p>
          
          <Link href={`/blog/${article.id}`}>
            <Button variant="ghost" className="gap-2 p-0 h-auto hover:bg-transparent hover:text-primary" data-testid={`button-read-more-${article.id}`}>
              Baca Selengkapnya
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
