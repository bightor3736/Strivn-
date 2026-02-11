'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function JoinPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const [invite, setInvite] = useState<any>(null);

  useEffect(() => { fetch(`/api/team/invites/${params.token}`).then((r) => r.json()).then(setInvite); }, [params.token]);

  if (!invite) return <main className="p-6">Loading…</main>;
  return <main className="mx-auto max-w-xl p-6"><h1 className="text-2xl">{invite.owner_username} invited you to join {invite.team_name}</h1><div className="mt-4 flex gap-2"><Button onClick={async()=>{const res=await fetch(`/api/team/invites/${params.token}/accept`,{method:'POST'});if(res.status===401){router.push(`/login?redirect=/join/${params.token}`);return;}router.push('/team');}}>Join</Button><Button variant="outline" onClick={async()=>{await fetch(`/api/team/invites/${params.token}/decline`,{method:'POST'});router.push('/');}}>Decline</Button></div></main>;
}
