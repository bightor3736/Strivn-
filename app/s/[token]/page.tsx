'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ShareViewerPage() {
  const { token } = useParams<{ token: string }>();
  const [url, setUrl] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const eventId = useRef<string | null>(null);

  useEffect(() => {
    fetch(`/api/views/start`, { method: 'POST', body: JSON.stringify({ token }) }).then((r) => r.json()).then((d) => { setUrl(d.url); eventId.current = d.eventId; });
    const int = setInterval(() => fetch('/api/views/ping', { method: 'POST', body: JSON.stringify({ eventId: eventId.current, token, seconds: 10 }) }), 10000);
    return () => clearInterval(int);
  }, [token]);

  return <main className="mx-auto max-w-4xl p-4"><h1 className="mb-4 text-xl">Shared Contract</h1>{url && <Document file={url}><Page pageNumber={1} width={800} /></Document>}<div className="mt-4 flex gap-2"><Input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} /><Input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} /><Button onClick={()=>fetch('/api/approvals',{method:'POST',body:JSON.stringify({token,name,email})})}>Approve</Button><Button variant="outline" onClick={()=>fetch('/api/views/ping',{method:'POST',body:JSON.stringify({token,eventType:'download'})})}>Download</Button></div></main>;
}
