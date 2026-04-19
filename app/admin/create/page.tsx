'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Category } from '@/lib/types'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CreateNewsPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    image_url: '',
    source: '',
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const { data } = await response.json()
        setCategories(data || [])
        if (data?.length > 0) {
          setFormData((prev) => ({ ...prev, category_id: data[0].id }))
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          published_at: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        router.push('/admin')
      } else {
        alert('Gagal membuat berita')
      }
    } catch (error) {
      console.error('Error creating news:', error)
      alert('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Kembali ke Admin
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-8">Buat Berita Baru</h1>

        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Judul Berita *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul berita"
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Kategori *
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              URL Gambar
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Konten Berita *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Tulis konten berita di sini..."
              required
              rows={10}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Sumber Berita
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="Contoh: BBC, CNN, atau media lainnya"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Menyimpan...' : 'Simpan Berita'}
            </button>
            <Link
              href="/admin"
              className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg font-medium transition-colors text-center"
            >
              Batal
            </Link>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
