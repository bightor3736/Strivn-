import { NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase/service';

export async function POST(request: Request) {
  const { token, seconds = 0, eventType } = await request.json();
  const { data: share } = await serviceClient.from('share_links').select('id,file_id').eq('token', token).single();
  if (!share) return NextResponse.json({ error: 'Invalid link' }, { status: 404 });
  await serviceClient.from('share_events').insert({ file_id: share.file_id, share_link_id: share.id, event_type: eventType ?? 'view_ping', seconds_spent: seconds });
  return NextResponse.json({ ok: true });
}
