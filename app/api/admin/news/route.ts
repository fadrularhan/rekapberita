import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { title, content, category_id, image_url, source, published_at } = body

  if (!title || !content || !category_id) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('news')
    .insert({
      id: uuidv4(),
      title,
      content,
      category_id,
      image_url: image_url || null,
      source: source || null,
      published_at: published_at || new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
