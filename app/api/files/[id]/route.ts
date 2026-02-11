import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { serviceClient } from '@/lib/supabase/service';

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: file } = await supabase.from('files').select('storage_path').eq('id', id).single();
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await serviceClient.from('share_events').delete().eq('file_id', id);
  await serviceClient.from('approvals').delete().eq('file_id', id);
  await serviceClient.from('share_links').delete().eq('file_id', id);
  await serviceClient.storage.from('files').remove([file.storage_path]);
  await supabase.from('files').delete().eq('id', id);
  return NextResponse.json({ ok: true });
}
