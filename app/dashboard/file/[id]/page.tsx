import { createClient } from '@/lib/supabase/server';
import { isoDate } from '@/lib/utils';

export default async function FileDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: file }, { data: events }] = await Promise.all([
    supabase.from('files').select('*').eq('id', id).single(),
    supabase.from('share_events').select('*,viewer_profiles(name,email),share_links(token)').eq('file_id', id).order('created_at', { ascending: false })
  ]);
  return <main className="mx-auto max-w-4xl p-6"><h1 className="text-2xl font-semibold">{file?.filename}</h1><h2 className="mt-4">Activity timeline</h2><div className="mt-2 space-y-2">{(events ?? []).map((e) => <div key={e.id} className="rounded border border-border p-2 text-sm">{e.event_type} · {(e.viewer_profiles as any)?.name ?? (e.viewer_profiles as any)?.email ?? 'Anonymous'} · share {(e.share_links as any)?.token} · {isoDate(e.created_at)}</div>)}</div></main>;
}
