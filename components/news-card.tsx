import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { News } from "@/lib/types";

interface NewsCardProps {
  news: News;
  featured?: boolean;
}

export function NewsCard({ news, featured = false }: NewsCardProps) {
  const formattedDate = news.published_at
    ? new Date(news.published_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  if (featured) {
    return (
      <Link href={`/berita/${news.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="aspect-[16/9] w-full overflow-hidden">
            {news.image_url ? (
              <Image
                src={news.image_url}
                alt={news.title}
                width={800}
                height={450}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {news.category && (
              <span
                className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: news.category.color }}
              >
                {news.category.name}
              </span>
            )}
            <h2 className="mb-2 text-balance text-2xl font-bold leading-tight text-white md:text-3xl">
              {news.title}
            </h2>
            <p className="mb-4 line-clamp-2 text-sm text-white/80">
              {news.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {news.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/berita/${news.slug}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
        <div className="aspect-[16/10] w-full overflow-hidden">
          {news.image_url ? (
            <Image
              src={news.image_url}
              alt={news.title}
              width={400}
              height={250}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-sm text-muted-foreground">No Image</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          {news.category && (
            <span
              className="mb-2 inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
              style={{ backgroundColor: news.category.color }}
            >
              {news.category.name}
            </span>
          )}
          <h3 className="mb-2 line-clamp-2 text-balance text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {news.title}
          </h3>
          <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {news.excerpt}
          </p>
          <div className="flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </span>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Baca <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
