-- Basquin Vision Phase 2 storage architecture for Supabase Storage
-- Run after `supabase/schema.sql`.
--
-- Bucket strategy:
-- 1. bv-originals: private full-resolution photo/video originals
-- 2. bv-previews: protected/web-resolution previews
-- 3. bv-thumbnails: lightweight gallery grid thumbnails
--
-- Originals should be delivered only through temporary signed URLs generated
-- server-side after checking project/gallery permissions.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'bv-originals',
    'bv-originals',
    false,
    5368709120,
    array['image/jpeg','image/png','image/webp','image/tiff','video/mp4','video/quicktime']
  ),
  (
    'bv-previews',
    'bv-previews',
    false,
    524288000,
    array['image/jpeg','image/png','image/webp','video/mp4']
  ),
  (
    'bv-thumbnails',
    'bv-thumbnails',
    false,
    52428800,
    array['image/jpeg','image/png','image/webp']
  )
on conflict (id) do nothing;

create policy "Admin and staff can upload originals"
on storage.objects for insert
with check (
  bucket_id = 'bv-originals'
  and public.is_admin_or_staff()
);

create policy "Admin and staff can upload previews"
on storage.objects for insert
with check (
  bucket_id in ('bv-previews', 'bv-thumbnails')
  and public.is_admin_or_staff()
);

create policy "Admin and staff can manage Basquin media objects"
on storage.objects for all
using (
  bucket_id in ('bv-originals', 'bv-previews', 'bv-thumbnails')
  and public.is_admin_or_staff()
)
with check (
  bucket_id in ('bv-originals', 'bv-previews', 'bv-thumbnails')
  and public.is_admin_or_staff()
);

-- Client viewing should normally happen through server-created signed URLs
-- after checking gallery_access/project_members. Keep direct bucket reads
-- restrictive so changing a URL cannot reveal another client's originals.
