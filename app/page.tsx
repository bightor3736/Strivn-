import Link from 'next/link';
import { IsometricWaveGridBackground } from '@/components/ui/isometric-wave-grid-background';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-65px)] overflow-hidden">
      <section className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center gap-6 p-6 text-center">
        <IsometricWaveGridBackground className="opacity-60" />
        <h1 className="relative text-5xl font-bold">Strivn Contract Vault</h1>
        <p className="relative max-w-2xl text-muted-foreground">Upload, share, approve, and analyze every contract from one premium workflow.</p>
        <div className="relative flex gap-3"><Link href="/login"><Button>Get Started</Button></Link><Link href="/dashboard"><Button variant="outline">Open Dashboard</Button></Link></div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 p-6 md:grid-cols-3">
        <Card>Secure PDF sharing + expiring links</Card><Card>Activity timelines + analytics</Card><Card>Team vault with invite links and roles</Card>
      </section>
    </main>
  );
}
