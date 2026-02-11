import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { fileId, expiresAt } = await request.json();
  const token = randomUUID().replace(/-/g, '');
  const { data, error } = await supabase.from('share_links').insert({ file_id: fileId, owner_id: user.id, token, expires_at: expiresAt ?? null }).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ...data, url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/s/${token}` });
}
