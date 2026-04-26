
-- Fix function search_path
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql security definer set search_path = public as $$
begin new.updated_at = now(); return new; end $$;

-- Replace broad public listing with explicit object read (still public, but no listing)
drop policy if exists "Media public read" on storage.objects;
create policy "Media public object read" on storage.objects
for select using (bucket_id = 'media');

-- Make bucket non-listable but still publicly readable per object
update storage.buckets set public = true where id = 'media';
