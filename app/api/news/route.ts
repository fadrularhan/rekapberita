import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  const supabase = await createClient()

  let query = supabase
    .from('news')
    .select('*, categories(name)', { count: 'exact' })
    .order('published_at', { ascending: false })

  if (category && category !== 'all') {
    query = query.eq('category_id', category)
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
  }

  const { data, error, count } = await query.limit(12)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, count })
}
