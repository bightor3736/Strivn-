create extension if not exists pgcrypto;

create type public.team_role as enum ('owner','admin','member');
create type public.invite_status as enum ('pending','accepted','declined');
create type public.share_event_type as enum ('view_start','view_ping','download','approval');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  created_at timestamptz not null default now()
);

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.team_role not null,
  created_at timestamptz not null default now(),
  unique(team_id,user_id)
);

create table public.team_invites (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  email text not null,
  token text not null unique,
  role public.team_role not null default 'member',
  status public.invite_status not null default 'pending',
  created_at timestamptz not null default now(),
  accepted_at timestamptz
);

create table public.sections (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  team_id uuid references public.teams(id) on delete cascade,
  name text not null,
  color text not null,
  created_at timestamptz not null default now()
);

create table public.files (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  team_id uuid references public.teams(id) on delete cascade,
  section_id uuid references public.sections(id) on delete set null,
  filename text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table public.share_links (
  id uuid primary key default gen_random_uuid(),
  file_id uuid not null references public.files(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  token text not null unique,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.viewer_profiles (
  id uuid primary key default gen_random_uuid(),
  share_link_id uuid not null references public.share_links(id) on delete cascade,
  name text,
  email text,
  created_at timestamptz not null default now()
);

create table public.approvals (
  id uuid primary key default gen_random_uuid(),
  file_id uuid not null references public.files(id) on delete cascade,
  share_link_id uuid not null references public.share_links(id) on delete cascade,
  viewer_profile_id uuid references public.viewer_profiles(id) on delete set null,
  name text,
  email text,
  created_at timestamptz not null default now()
);

create table public.share_events (
  id uuid primary key default gen_random_uuid(),
  file_id uuid not null references public.files(id) on delete cascade,
  share_link_id uuid not null references public.share_links(id) on delete cascade,
  viewer_profile_id uuid references public.viewer_profiles(id) on delete set null,
  event_type public.share_event_type not null,
  seconds_spent integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_files_owner on public.files(owner_id);
create index idx_files_team on public.files(team_id);
create index idx_events_file on public.share_events(file_id, created_at desc);
create index idx_invites_token on public.team_invites(token);

create or replace view public.file_stats_v2 as
select
  f.id as file_id,
  f.owner_id,
  count(distinct se.viewer_profile_id) filter (where se.event_type in ('view_start','view_ping'))::int as unique_viewers,
  coalesce(sum(se.seconds_spent) filter (where se.event_type in ('view_start','view_ping')),0)::int as total_seconds,
  max(se.created_at) filter (where se.event_type in ('view_start','view_ping')) as last_viewed_at,
  count(a.id)::int as approval_count,
  (array_agg(a.name order by a.created_at desc))[1] as latest_approval_name,
  max(a.created_at) as latest_approved_at,
  count(se.id) filter (where se.event_type='download')::int as download_count
from public.files f
left join public.share_events se on se.file_id=f.id
left join public.approvals a on a.file_id=f.id
group by f.id,f.owner_id;

alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.team_invites enable row level security;
alter table public.sections enable row level security;
alter table public.files enable row level security;
alter table public.share_links enable row level security;
alter table public.viewer_profiles enable row level security;
alter table public.approvals enable row level security;
alter table public.share_events enable row level security;

create or replace function public.is_team_member(team uuid)
returns boolean language sql security definer stable as $$
  select exists(select 1 from public.team_members tm where tm.team_id=team and tm.user_id=auth.uid());
$$;

create policy profiles_select_own on public.profiles for select using (id=auth.uid());
create policy profiles_upsert_own on public.profiles for all using (id=auth.uid()) with check (id=auth.uid());

create policy teams_read_member on public.teams for select using (owner_id=auth.uid() or public.is_team_member(id));
create policy teams_insert_owner on public.teams for insert with check (owner_id=auth.uid());
create policy teams_update_owner on public.teams for update using (owner_id=auth.uid());

create policy members_read_team on public.team_members for select using (user_id=auth.uid() or public.is_team_member(team_id));
create policy members_manage_admin on public.team_members for all using (
  exists(select 1 from public.team_members me where me.team_id=team_members.team_id and me.user_id=auth.uid() and me.role in ('owner','admin'))
) with check (
  exists(select 1 from public.team_members me where me.team_id=team_members.team_id and me.user_id=auth.uid() and me.role in ('owner','admin'))
);

create policy invites_read_team on public.team_invites for select using (public.is_team_member(team_id));
create policy invites_manage_admin on public.team_invites for all using (
  exists(select 1 from public.team_members me where me.team_id=team_invites.team_id and me.user_id=auth.uid() and me.role in ('owner','admin'))
) with check (
  exists(select 1 from public.team_members me where me.team_id=team_invites.team_id and me.user_id=auth.uid() and me.role in ('owner','admin'))
);

create policy sections_owner_or_team on public.sections for all using (owner_id=auth.uid() or (team_id is not null and public.is_team_member(team_id))) with check (owner_id=auth.uid() or (team_id is not null and public.is_team_member(team_id)));
create policy files_owner_or_team on public.files for all using (owner_id=auth.uid() or (team_id is not null and public.is_team_member(team_id))) with check (owner_id=auth.uid() or (team_id is not null and public.is_team_member(team_id)));
create policy links_owner_or_team on public.share_links for all using (owner_id=auth.uid() or exists(select 1 from public.files f where f.id=file_id and f.team_id is not null and public.is_team_member(f.team_id))) with check (owner_id=auth.uid());
create policy approvals_owner_or_team on public.approvals for select using (exists(select 1 from public.files f where f.id=file_id and (f.owner_id=auth.uid() or (f.team_id is not null and public.is_team_member(f.team_id)))));
create policy events_owner_or_team on public.share_events for select using (exists(select 1 from public.files f where f.id=file_id and (f.owner_id=auth.uid() or (f.team_id is not null and public.is_team_member(f.team_id)))));
create policy viewer_profiles_open on public.viewer_profiles for insert with check (true);
create policy approvals_open_insert on public.approvals for insert with check (true);
create policy events_open_insert on public.share_events for insert with check (true);

insert into storage.buckets (id, name, public) values ('files', 'files', false) on conflict (id) do nothing;
create policy storage_files_read_owner on storage.objects for select using (bucket_id='files' and (auth.uid()::text = owner or exists(select 1 from public.files f where f.storage_path=name and (f.owner_id=auth.uid() or (f.team_id is not null and public.is_team_member(f.team_id))))));
create policy storage_files_insert_authed on storage.objects for insert with check (bucket_id='files' and auth.role()='authenticated');
create policy storage_files_delete_owner on storage.objects for delete using (bucket_id='files' and exists(select 1 from public.files f where f.storage_path=name and f.owner_id=auth.uid()));
