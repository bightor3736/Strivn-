import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardClient } from '@/components/dashboard/dashboard-client';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [{ data: files }, { data: sections }, { data: stats }] = await Promise.all([
    supabase.from('files').select('id,filename,section_id').order('created_at', { ascending: false }),
    supabase.from('sections').select('id,name,color').order('created_at'),
    supabase.from('file_stats_v2').select('*')
  ]);

  return <main className="mx-auto max-w-6xl p-6"><h1 className="mb-4 text-2xl font-semibold">Library</h1><DashboardClient files={files ?? []} sections={sections ?? []} stats={stats ?? []} /></main>;
}
