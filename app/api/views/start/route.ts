import { NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase/service';

export async function POST(request: Request) {
  const { token } = await request.json();
  const { data: share } = await serviceClient.from('share_links').select('id,file_id,files(storage_path)').eq('token', token).is('revoked_at', null).single();
  if (!share) return NextResponse.json({ error: 'Invalid link' }, { status: 404 });
  const { data: signed } = await serviceClient.storage.from('files').createSignedUrl((share.files as any).storage_path, 3600);
  const { data: event } = await serviceClient.from('share_events').insert({ file_id: share.file_id, share_link_id: share.id, event_type: 'view_start' }).select('id').single();
  return NextResponse.json({ url: signed?.signedUrl, eventId: event?.id });
}
