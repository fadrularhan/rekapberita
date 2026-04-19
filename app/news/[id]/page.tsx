'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { News } from '@/lib/types'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

export default function NewsDetail() {
  const params = useParams()
  const router = useRouter()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedNews, setRelatedNews] = useState<News[]>([])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news/${params.id}`)
        if (!response.ok) throw new Error('News not found')
        const { data } = await response.json()
        setNews(data)

        // Fetch related news
        if (data?.category_id) {
          const relatedResponse = await fetch(
            `/api/news?category=${data.category_id}`
          )
          const { data: relatedData } = await relatedResponse.json()
          setRelatedNews(relatedData?.filter((n: News) => n.id !== params.id).slice(0, 3) || [])
        }
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-surface rounded w-3/4"></div>
            <div className="h-96 bg-surface rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-surface rounded"></div>
              <div className="h-4 bg-surface rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Berita tidak ditemukan</h1>
          <Link href="/" className="text-primary hover:underline">
            Kembali ke halaman utama
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Kembali
        </Link>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {news.categories && (
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  <Tag size={14} />
                  {news.categories.name}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <time dateTime={news.published_at}>
                  {new Date(news.published_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <span className="text-sm">
                Waktu baca: ~{Math.ceil(news.content.split(' ').length / 200)} menit
              </span>
            </div>
          </header>

          {/* Featured Image */}
          {news.image_url && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
              {news.content}
            </p>
          </div>

          {/* Source */}
          {news.source && (
            <div className="border-t border-border pt-6 mb-8">
              <p className="text-sm text-muted-foreground">
                <strong>Sumber:</strong> {news.source}
              </p>
            </div>
          )}
        </article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Berita Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <div className="group bg-surface rounded-lg overflow-hidden border border-border hover:border-primary transition-colors">
                    {item.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {new Date(item.published_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
