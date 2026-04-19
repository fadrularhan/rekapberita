'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import NewsForm from '@/components/news-form'
import type { News } from '@/lib/types'

export default function EditNewsPage() {
  const params = useParams()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news/${params.id}`)
        if (!response.ok) throw new Error('Berita tidak ditemukan')
        const data = await response.json()
        setNews(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching news')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchNews()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-600">Memuat...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Edit Berita</h1>
        {news && <NewsForm news={news} />}
      </div>
    </div>
  )
}
