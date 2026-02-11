import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: invite } = await supabase.from('team_invites').select('*').eq('token', token).eq('status', 'pending').single();
  if (!invite) return NextResponse.json({ error: 'Invalid invite' }, { status: 404 });
  await supabase.from('team_members').insert({ team_id: invite.team_id, user_id: user.id, role: invite.role });
  await supabase.from('team_invites').update({ status: 'accepted', accepted_at: new Date().toISOString() }).eq('id', invite.id);
  return NextResponse.json({ ok: true });
}
