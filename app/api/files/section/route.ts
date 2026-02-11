import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { fileId, sectionId } = await request.json();
  const { error } = await supabase.from('files').update({ section_id: sectionId }).eq('id', fileId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
