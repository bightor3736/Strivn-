'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogRoot, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export function TeamClient({ team, members, invites }: { team: any; members: any[]; invites: any[] }) {
  const [email, setEmail] = useState('');
  const router = useRouter();
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">My Team: {team?.name ?? 'No team'}</h1>
  <Button onClick={async()=>{await fetch('/api/team/bootstrap',{method:'POST'});router.refresh();}}>Bootstrap Team</Button>
  <DialogRoot><Button variant="outline">Invite Member</Button><DialogContent><DialogTitle>Create invite</DialogTitle><Input value={email} onChange={(e)=>setEmail(e.target.value)} /><Button onClick={async()=>{await fetch('/api/team/invites',{method:'POST',body:JSON.stringify({email,role:'member'})});router.refresh();}}>Create</Button></DialogContent></DialogRoot>
  <div>{members.map((m)=><div key={m.id} className="rounded border border-border p-2">{m.profiles?.username ?? m.user_id} · {m.role}</div>)}</div>
  <div>{invites.map((i)=><div key={i.id} className="rounded border border-border p-2">{i.email} · {i.status} · /join/{i.token}</div>)}</div>
  </div>;
}
