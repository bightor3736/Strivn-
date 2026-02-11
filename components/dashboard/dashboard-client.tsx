'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogRoot, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { isoDate } from '@/lib/utils';

import { createClient } from '@/lib/supabase/browser';

type FileRow = { id: string; filename: string; section_id: string | null };
type Section = { id: string; name: string; color: string };
type Stat = { file_id: string; unique_viewers: number; total_seconds: number; last_viewed_at: string | null; approval_count: number; download_count: number };

export function DashboardClient({ files, sections, stats }: { files: FileRow[]; sections: Section[]; stats: Stat[] }) {
  const router = useRouter();
  const [sectionName, setSectionName] = useState('');
  const [sectionColor, setSectionColor] = useState('#7c8cff');
  const byId = new Map(stats.map((s) => [s.file_id, s]));
  const supabase = createClient();

  return <div className="space-y-4">
    <div className="flex gap-2">
      <DialogRoot><Button>Create Section</Button><DialogContent><DialogTitle>Create section</DialogTitle><Input value={sectionName} onChange={(e) => setSectionName(e.target.value)} /><Input type="color" value={sectionColor} onChange={(e) => setSectionColor(e.target.value)} /><Button onClick={async () => { await fetch('/api/sections', { method: 'POST', body: JSON.stringify({ name: sectionName, color: sectionColor }) }); router.refresh(); }}>Save</Button></DialogContent></DialogRoot>
      <Button variant="outline" onClick={() => router.push('/analytics')}>Analytics</Button>
      <DialogRoot><Button variant="outline">Upload PDF</Button><DialogContent><DialogTitle>Upload PDF</DialogTitle><Input type="file" accept="application/pdf" onChange={async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const path = `${crypto.randomUUID()}-${file.name}`;
        const up = await supabase.storage.from('files').upload(path, file);
        if (up.error) return;
        await supabase.from('files').insert({ filename: file.name, storage_path: path, owner_id: (await supabase.auth.getUser()).data.user?.id! });
        router.refresh();
      }} /></DialogContent></DialogRoot>
    </div>
    <div className="grid gap-3">
      {files.map((f) => {
        const stat = byId.get(f.id);
        return <div key={f.id} className="rounded-lg border border-border p-3">
          <div className="flex items-center justify-between"><a href={`/dashboard/file/${f.id}`} className="font-medium">{f.filename}</a><Badge>{sections.find((s) => s.id === f.section_id)?.name ?? 'Ungrouped'}</Badge></div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground md:grid-cols-5">
            <span>Views: {stat?.unique_viewers ?? 0}</span><span>Time: {stat?.total_seconds ?? 0}s</span><span>Last: {isoDate(stat?.last_viewed_at ?? null)}</span><span>Approvals: {stat?.approval_count ?? 0}</span><span>Downloads: {stat?.download_count ?? 0}</span>
          </div>
          <div className="mt-2 flex gap-2">
            <select className="rounded border border-border bg-transparent px-2" defaultValue={f.section_id ?? ''} onChange={async (e) => { await fetch('/api/files/section', { method: 'POST', body: JSON.stringify({ fileId: f.id, sectionId: e.target.value || null }) }); router.refresh(); }}>
              <option value="">Ungrouped</option>{sections.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <DialogRoot><Button variant="outline">Delete</Button><DialogContent><DialogTitle>Delete file?</DialogTitle><Button onClick={async () => { await fetch(`/api/files/${f.id}`, { method: 'DELETE' }); router.refresh(); }}>Confirm delete</Button></DialogContent></DialogRoot>
          </div>
        </div>;
      })}
    </div>
  </div>;
}
