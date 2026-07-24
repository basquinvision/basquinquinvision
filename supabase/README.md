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
- Product/canvas pricing tables
- Orders/payments/invoices architecture
- Communication/email preferences
- Audit logs
- Admin-editable business settings

## Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Paste and run `supabase/schema.sql`.
4. In Vercel, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Enable auth providers in Supabase:
   - Email/password
   - Google
   - Facebook
6. Add redirect URL:
   - `https://basquinquinvision-three.vercel.app/#/portal`

## Security note

Never put the Supabase service-role key, Stripe secret key, or webhook secrets in frontend files.
Those belong only in serverless functions or provider dashboards.
