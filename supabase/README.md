# Basquin Vision Supabase Setup

This folder is the Phase 1 backend foundation for Basquin Vision.

## What it adds

- Central user profile architecture
- Role-based access control for ADMIN, STAFF, CLIENT, TALENT, COLLABORATOR
- Client CRM tables
- Project system
- Gallery/media metadata architecture
- Favorites and selections
- Download tracking
- Protected Supabase Storage bucket plan for originals, previews, thumbnails
- Product/canvas pricing tables
- Orders/payments/invoices architecture
- Communication/email preferences
- Audit logs
- Admin-editable business settings

## Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Paste and run `supabase/schema.sql`.
4. Paste and run `supabase/storage.sql`.
5. In Vercel, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Enable auth providers in Supabase:
   - Email/password
   - Google
   - Facebook
7. Add redirect URL:
   - `https://basquinquinvision-three.vercel.app/#/portal`

## Phase 2 media rules

- `bv-originals` stores protected full-resolution photos/videos.
- `bv-previews` stores optimized web viewing files.
- `bv-thumbnails` stores fast mobile gallery grid images.
- The database table `media_assets` stores metadata and storage keys.
- Downloads should be generated through short-lived signed URLs after server-side permission checks.
- Never expose permanent public URLs to original client photographs.

## Security note

Never put the Supabase service-role key, Stripe secret key, or webhook secrets in frontend files.
Those belong only in serverless functions or provider dashboards.
