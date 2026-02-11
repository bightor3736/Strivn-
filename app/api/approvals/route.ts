import { NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase/service';

export async function POST(request: Request) {
  const { token, name, email } = await request.json();
  const { data: share } = await serviceClient.from('share_links').select('id,file_id').eq('token', token).single();
  if (!share) return NextResponse.json({ error: 'Invalid link' }, { status: 404 });
  const { data: viewer } = await serviceClient.from('viewer_profiles').insert({ share_link_id: share.id, name: name || null, email: email || null }).select('id').single();
  await serviceClient.from('approvals').insert({ file_id: share.file_id, share_link_id: share.id, viewer_profile_id: viewer?.id ?? null, name, email });
  await serviceClient.from('share_events').insert({ file_id: share.file_id, share_link_id: share.id, viewer_profile_id: viewer?.id ?? null, event_type: 'approval' });
  return NextResponse.json({ ok: true });
}
