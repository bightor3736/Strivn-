import { NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase/service';

export async function POST(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  await serviceClient.from('team_invites').update({ status: 'declined' }).eq('token', token);
  return NextResponse.json({ ok: true });
}
