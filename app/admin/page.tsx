'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { News, Category } from '@/lib/types'
import { Plus, Edit2, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  const [news, setNews] = useState<News[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, categoriesRes] = await Promise.all([
          fetch('/api/news?limit=100'),
          fetch('/api/categories'),
        ])
        const { data: newsData } = await newsRes.json()
        const { data: categoriesData } = await categoriesRes.json()
        setNews(newsData || [])
        setCategories(categoriesData || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return

    try {
      const response = await fetch(`/api/news/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setNews(news.filter((n) => n.id !== id))
      }
    } catch (error) {
      console.error('Error deleting news:', error)
    }
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Tidak diketahui'
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">Admin Panel</h1>
          <Link
            href="/admin/create"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            Tambah Berita
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Memuat data...</p>
          </div>
        ) : news.length > 0 ? (
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Judul
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {news.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-background/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-foreground">
                        <div className="line-clamp-2 font-medium">{item.title}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {getCategoryName(item.category_id)}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(item.published_at).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/news/${item.id}`}
                            className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 p-2"
                            title="Lihat"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            href={`/admin/edit/${item.id}`}
                            className="inline-flex items-center gap-1 text-yellow-500 hover:text-yellow-600 p-2"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="inline-flex items-center gap-1 text-red-500 hover:text-red-600 p-2"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-surface border border-border rounded-lg">
            <p className="text-muted-foreground mb-4">Belum ada berita</p>
            <Link
              href="/admin/create"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus size={18} />
              Buat Berita Pertama
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
