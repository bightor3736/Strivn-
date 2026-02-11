# Strivn

Production-ready SaaS contract vault built with Next.js 15 + Supabase.

## Setup

1. Create `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
2. Run migration `db/migrations/20260211_strivn_init.sql` in Supabase SQL editor.
3. Ensure storage bucket `files` exists (migration creates it).
4. Install deps and run:
   - `npm install`
   - `npm run dev`

## Deploy

Deploy on Vercel with same env vars. Route handlers are Next.js 15 compatible with async params typing.
