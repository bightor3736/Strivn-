import { NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase/service';

export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const { data: invite } = await serviceClient.from('team_invites').select('*,teams(name,owner_id)').eq('token', token).single();
  if (!invite) return NextResponse.json({ error: 'Invite not found' }, { status: 404 });
  const { data: ownerProfile } = await serviceClient.from('profiles').select('username').eq('id', (invite.teams as any).owner_id).maybeSingle();
  return NextResponse.json({ ...invite, owner_username: ownerProfile?.username ?? 'A teammate', team_name: (invite.teams as any).name });
}
