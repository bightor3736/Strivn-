import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/ui/avatar';

export async function AppHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user ? await supabase.from('profiles').select('username').eq('id', user.id).maybeSingle() : { data: null };
  const label = profile?.username ?? user?.email ?? 'Guest';

  return (
    <header className="border-b border-border/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="font-semibold">Strivn</Link>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild><button className="flex items-center gap-2"><UserAvatar name={label} /><span>{label}</span></button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild><Link href="/dashboard">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/team">My Team</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/team">Invites</Link></DropdownMenuItem>
              <DropdownMenuItem>Billing (stub)</DropdownMenuItem>
              <DropdownMenuItem asChild><form action="/auth/logout" method="post"><button type="submit">Logout</button></form></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : <Link href="/login">Login</Link>}
      </div>
    </header>
  );
}
