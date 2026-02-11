import { createClient } from '@/lib/supabase/server';
import { TeamClient } from '@/components/dashboard/team-client';

export default async function TeamPage() {
  const supabase = await createClient();
  const { data: team } = await supabase.from('teams').select('*').order('created_at').limit(1).maybeSingle();
  const { data: members } = team ? await supabase.from('team_members').select('id,user_id,role,profiles(username)').eq('team_id', team.id) : { data: [] as any };
  const { data: invites } = team ? await supabase.from('team_invites').select('*').eq('team_id', team.id).order('created_at', { ascending: false }) : { data: [] as any };
  return <main className="mx-auto max-w-4xl p-6"><TeamClient team={team} members={members ?? []} invites={invites ?? []} /></main>;
}
