import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { email, role } = await request.json();
  const { data: membership } = await supabase.from('team_members').select('team_id,role').eq('user_id', user.id).single();
  if (!membership || !['owner', 'admin'].includes(membership.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const token = randomUUID().replace(/-/g, '');
  const { data, error } = await supabase.from('team_invites').insert({ team_id: membership.team_id, email, role, token, status: 'pending' }).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ...data, join_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/join/${token}` });
}
