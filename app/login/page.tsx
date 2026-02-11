'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/browser';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IsometricWaveGridBackground } from '@/components/ui/isometric-wave-grid-background';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const redirectTo = search.get('redirect') ?? '/dashboard';

  return (
    <main className="relative mx-auto min-h-[calc(100vh-65px)] max-w-md p-6">
      <div className="relative min-h-[500px] overflow-hidden rounded-2xl border border-border p-6">
        <IsometricWaveGridBackground className="opacity-40" />
        <div className="relative space-y-3">
          <h1 className="text-2xl font-semibold">Login / Sign up</h1>
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="Username (signup)" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Button onClick={async () => { await supabase.auth.signInWithPassword({ email, password }); router.push(redirectTo); router.refresh(); }}>Login</Button>
          <Button variant="outline" onClick={async () => {
            await supabase.auth.signUp({ email, password });
            const { data } = await supabase.auth.getUser();
            if (data.user && username) await fetch('/api/me', { method: 'POST', body: JSON.stringify({ username }) });
            router.push('/dashboard');
          }}>Sign up</Button>
        </div>
      </div>
    </main>
  );
}
