'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import NewsCard from '@/components/news-card'
import CategoryFilter from '@/components/category-filter'
import { News, Category } from '@/lib/types'

export default function Home() {
  const [news, setNews] = useState<News[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState(true)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const { data } = await response.json()
        setCategories(data || [])
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  // Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (selectedCategory !== 'all') params.append('category', selectedCategory)
        if (searchQuery) params.append('search', searchQuery)

        const response = await fetch(`/api/news?${params.toString()}`)
        const { data } = await response.json()
        setNews(data || [])
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchNews()
    }, 300)

    return () => clearTimeout(timer)
  }, [selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onSearch={setSearchQuery} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary via-primary to-accent py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white text-balance mb-4">
              Rekap Berita Terkini
            </h1>
            <p className="text-xl text-white/90 text-balance">
              Dapatkan informasi terbaru dari berbagai kategori berita setiap hari
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="bg-surface border-b border-border sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </section>

        {/* News Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-surface rounded-lg h-96 animate-pulse border border-border"
                />
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Tidak ada berita yang ditemukan
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
