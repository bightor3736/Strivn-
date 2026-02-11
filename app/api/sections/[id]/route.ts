import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  await supabase.from('files').update({ section_id: null }).eq('section_id', id);
  await supabase.from('sections').delete().eq('id', id);
  return NextResponse.json({ ok: true });
}
