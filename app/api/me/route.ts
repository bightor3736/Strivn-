import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ user: null });
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
  const { data: team } = await supabase.from('team_members').select('team_id,role,teams(name)').eq('user_id', user.id).limit(1).maybeSingle();
  return NextResponse.json({ user, profile, team });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { username } = await request.json();
  const { error } = await supabase.from('profiles').upsert({ id: user.id, username });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
