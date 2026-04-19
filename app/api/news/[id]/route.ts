import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('news')
    .select('*, categories(name)')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json(
      { error: 'News not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({ data })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Deleted successfully' })
}
