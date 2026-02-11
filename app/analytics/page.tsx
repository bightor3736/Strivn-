import { createClient } from '@/lib/supabase/server';
import { isoDate } from '@/lib/utils';
import type { Database } from '@/lib/supabase/types';

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('file_stats_v2')
    .select('*')
    .order('last_viewed_at', { ascending: false, nullsFirst: false })
    .returns<Database['public']['Views']['file_stats_v2']['Row'][]>();
  return <main className="mx-auto max-w-6xl p-6"><h1 className="text-2xl font-semibold">Analytics</h1><div className="mt-4 space-y-2">{(data ?? []).map((r) => <div key={r.file_id} className="rounded border border-border p-3 text-sm">{r.file_id} · viewers {r.unique_viewers} · approvals {r.approval_count} · last {isoDate(r.last_viewed_at)}</div>)}</div></main>;
}
