import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: member } = await supabase.from('team_members').select('id').eq('user_id', user.id).maybeSingle();
  if (member) return NextResponse.json({ ok: true, message: 'Already in team' });
  const { data: team } = await supabase.from('teams').insert({ owner_id: user.id, name: 'My Team' }).select('*').single();
  await supabase.from('team_members').insert({ team_id: team!.id, user_id: user.id, role: 'owner' });
  return NextResponse.json({ ok: true, team });
}
