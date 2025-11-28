import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArticleCard } from "@/components/article-card";
import type { Article } from "@shared/schema";
import { motion } from "framer-motion";

export default function BlogArticlePage() {
  const { id } = useParams();

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: ["/api/articles", id],
  });

  const { data: allArticles } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="aspect-video rounded-lg mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-32 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardContent className="py-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Artikel Tidak Ditemukan</h2>
              <p className="text-muted-foreground mb-6">
                Artikel yang Anda cari tidak tersedia.
              </p>
              <Link href="/blog">
                <Button>Kembali ke Blog</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const otherArticles = allArticles?.filter((a) => a.id !== article.id).slice(0, 3) || [];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back-blog">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Blog
          </Button>
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-article-title">
            {article.title}
          </h1>

          <div className="flex items-center justify-between mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Bagikan
            </Button>
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
            data-testid="text-article-content"
          />
        </motion.article>

        {otherArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 border-t pt-12"
          >
            <h2 className="text-2xl font-bold mb-6">Artikel Lainnya</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {otherArticles.map((otherArticle, index) => (
                <ArticleCard key={otherArticle.id} article={otherArticle} index={index} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
