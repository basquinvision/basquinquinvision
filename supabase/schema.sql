-- Basquin Vision Phase 1 platform schema
-- Target: Supabase/PostgreSQL
-- Purpose: authentication-adjacent profiles, roles, CRM, projects, galleries,
-- media metadata, products, orders, communication history, and future talent.
--
-- Do not store original photos/videos in Postgres. Store only metadata and
-- private storage keys. Media bytes belong in object storage.

create extension if not exists "pgcrypto";

do $$ begin
  create type public.user_role as enum ('ADMIN', 'STAFF', 'CLIENT', 'TALENT', 'COLLABORATOR');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.project_status as enum (
    'INQUIRY',
    'BOOKED',
    'SCHEDULED',
    'SHOOT_COMPLETED',
    'EDITING',
    'PROOFING',
    'READY_FOR_REVIEW',
    'DELIVERED',
    'ARCHIVED',
    'CANCELLED'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.order_status as enum (
    'PENDING_PAYMENT',
    'PAID',
    'PROCESSING',
    'SENT_TO_LAB',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'REFUNDED'
  );
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  first_name text,
  last_name text,
  display_name text,
  phone text,
  company text,
  city text default 'South Florida',
  avatar_url text,
  account_type text default 'client',
  marketing_consent boolean not null default false,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  name public.user_role not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  user_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  granted_by uuid references public.profiles(id) on delete set null,
  granted_at timestamptz not null default now(),
  primary key (user_id, role_id)
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  first_name text,
  last_name text,
  email text not null,
  phone text,
  company text,
  account_type text default 'client',
  total_spending numeric(12,2) not null default 0,
  last_contact_at timestamptz,
  internal_notes text,
  tags text[] not null default '{}',
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.staff_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  title text,
  permissions jsonb not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.talent_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  professional_name text,
  legal_name text,
  profile_photo_key text,
  demo_reel_url text,
  resume_key text,
  biography text,
  location text,
  height text,
  age_range text,
  union_status text,
  representation text,
  agent_name text,
  manager_name text,
  contact_email text,
  contact_phone text,
  skills text[] not null default '{}',
  languages text[] not null default '{}',
  credits jsonb not null default '[]',
  social_links jsonb not null default '{}',
  imdb_url text,
  portfolio_url text,
  availability text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  client_id uuid not null references public.clients(id) on delete cascade,
  project_type text not null,
  description text,
  shoot_date date,
  status public.project_status not null default 'INQUIRY',
  client_status_label text default 'Inquiry received',
  cover_media_id uuid,
  delivery_deadline date,
  expires_at timestamptz,
  download_permissions jsonb not null default '{"enabled": false}',
  purchase_permissions jsonb not null default '{"enabled": false}',
  notes text,
  internal_admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_members (
  project_id uuid not null references public.projects(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'viewer',
  can_view boolean not null default true,
  can_download boolean not null default false,
  can_purchase boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (project_id, profile_id)
);

create table if not exists public.galleries (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  slug text not null,
  description text,
  cover_media_id uuid,
  published boolean not null default false,
  password_hash text,
  expires_at timestamptz,
  downloads_enabled boolean not null default false,
  purchase_enabled boolean not null default false,
  sharing_enabled boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id, slug)
);

create table if not exists public.gallery_access (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references public.galleries(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  access_code text,
  can_view boolean not null default true,
  can_favorite boolean not null default true,
  can_download boolean not null default false,
  can_purchase boolean not null default false,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  gallery_id uuid references public.galleries(id) on delete cascade,
  owner_id uuid references public.profiles(id) on delete set null,
  filename text not null,
  original_filename text,
  mime_type text not null,
  file_type text not null,
  file_size bigint,
  width integer,
  height integer,
  duration_seconds integer,
  storage_key text not null unique,
  thumbnail_key text,
  preview_key text,
  upload_status text not null default 'pending',
  visibility text not null default 'private',
  download_permission text not null default 'none',
  watermark_status text not null default 'none',
  sort_order integer not null default 0,
  hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects
  add constraint projects_cover_media_fk foreign key (cover_media_id) references public.media_assets(id) on delete set null;

alter table public.galleries
  add constraint galleries_cover_media_fk foreign key (cover_media_id) references public.media_assets(id) on delete set null;

create table if not exists public.favorite_collections (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references public.galleries(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  name text not null default 'Favorites',
  purpose text default 'favorites',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(gallery_id, profile_id, name)
);

create table if not exists public.favorites (
  collection_id uuid not null references public.favorite_collections(id) on delete cascade,
  media_asset_id uuid not null references public.media_assets(id) on delete cascade,
  note text,
  created_at timestamptz not null default now(),
  primary key (collection_id, media_asset_id)
);

create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  media_asset_id uuid references public.media_assets(id) on delete set null,
  gallery_id uuid references public.galleries(id) on delete set null,
  download_type text not null,
  resolution text,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  description text,
  image_url text,
  supplier text,
  sku text,
  production_notes text,
  shipping_config jsonb not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  size_label text not null,
  supplier_cost numeric(12,2) not null default 0,
  retail_price numeric(12,2) not null default 0,
  sale_price numeric(12,2),
  sku text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(product_id, size_label)
);

create or replace view public.product_variant_margins as
select
  pv.*,
  coalesce(pv.sale_price, pv.retail_price) - pv.supplier_cost as gross_margin_dollars,
  case
    when coalesce(pv.sale_price, pv.retail_price) > 0 then
      round(((coalesce(pv.sale_price, pv.retail_price) - pv.supplier_cost) / coalesce(pv.sale_price, pv.retail_price)) * 100, 2)
    else 0
  end as gross_margin_percent
from public.product_variants pv;

create table if not exists public.shopping_carts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.shopping_carts(id) on delete cascade,
  media_asset_id uuid references public.media_assets(id) on delete set null,
  product_variant_id uuid not null references public.product_variants(id) on delete restrict,
  quantity integer not null default 1 check (quantity > 0),
  options jsonb not null default '{}',
  unit_price numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  status public.order_status not null default 'PENDING_PAYMENT',
  subtotal numeric(12,2) not null default 0,
  tax numeric(12,2) not null default 0,
  shipping numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  currency text not null default 'usd',
  shipping_address jsonb not null default '{}',
  tracking_number text,
  tracking_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  media_asset_id uuid references public.media_assets(id) on delete set null,
  product_variant_id uuid references public.product_variants(id) on delete set null,
  description text not null,
  quantity integer not null default 1,
  unit_price numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  production_status text default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete set null,
  provider text not null default 'stripe',
  provider_payment_id text,
  status text not null default 'pending',
  amount numeric(12,2) not null default 0,
  currency text not null default 'usd',
  refunded_amount numeric(12,2) not null default 0,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  invoice_number text unique,
  status text not null default 'draft',
  amount_due numeric(12,2) not null default 0,
  due_date date,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.email_preferences (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  transactional_enabled boolean not null default true,
  marketing_enabled boolean not null default false,
  gallery_notifications boolean not null default true,
  order_notifications boolean not null default true,
  booking_reminders boolean not null default true,
  unsubscribed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.email_templates (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  subject text not null,
  body text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.communications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  channel text not null default 'email',
  direction text not null default 'outbound',
  subject text,
  body text,
  provider text,
  provider_message_id text,
  status text not null default 'draft',
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  body text,
  notification_type text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id uuid,
  metadata jsonb not null default '{}',
  ip_address inet,
  created_at timestamptz not null default now()
);

create table if not exists public.business_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_type text not null,
  status text not null default 'new',
  name text not null,
  email text not null,
  phone text,
  project_type text,
  package_interest text,
  budget text,
  event_date date,
  venue_or_city text,
  guest_count text,
  addons text[],
  message text,
  source_page text,
  created_at timestamptz not null default now()
);

create index if not exists profiles_email_idx on public.profiles (lower(email));
create index if not exists clients_email_idx on public.clients (lower(email));
create index if not exists clients_tags_idx on public.clients using gin (tags);
create index if not exists projects_client_id_idx on public.projects (client_id);
create index if not exists projects_status_idx on public.projects (status);
create index if not exists project_members_profile_id_idx on public.project_members (profile_id);
create index if not exists galleries_project_id_idx on public.galleries (project_id);
create index if not exists media_assets_gallery_id_idx on public.media_assets (gallery_id);
create index if not exists media_assets_project_id_idx on public.media_assets (project_id);
create index if not exists favorites_media_asset_id_idx on public.favorites (media_asset_id);
create index if not exists orders_profile_id_idx on public.orders (profile_id);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists communications_profile_id_idx on public.communications (profile_id);
create index if not exists audit_logs_actor_id_idx on public.audit_logs (actor_id);
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

insert into public.roles (name, description) values
  ('ADMIN', 'Complete Basquin Vision platform access'),
  ('STAFF', 'Operational team access controlled by admin permissions'),
  ('CLIENT', 'Client access to assigned projects, galleries, downloads, orders, and invoices'),
  ('TALENT', 'Future actor/model/talent profile access'),
  ('COLLABORATOR', 'Future creative collaborator and crew access')
on conflict (name) do nothing;

insert into public.products (category, name, description, supplier, sku, production_notes)
values
  ('canvas', 'Canvas Print', 'Outsourced professional wall-ready canvas print.', 'Professional print lab', 'BV-CANVAS', 'Verify crop, color, and shipping before sending to lab.')
on conflict do nothing;

insert into public.product_variants (product_id, size_label, supplier_cost, retail_price, sku)
select p.id, v.size_label, v.supplier_cost, v.retail_price, v.sku
from public.products p
cross join (values
  ('8x10', 45.00, 129.00, 'BV-CANVAS-8X10'),
  ('11x14', 65.00, 179.00, 'BV-CANVAS-11X14'),
  ('16x20', 125.00, 249.00, 'BV-CANVAS-16X20'),
  ('16x24', 140.00, 279.00, 'BV-CANVAS-16X24'),
  ('20x24', 155.00, 299.00, 'BV-CANVAS-20X24'),
  ('20x30', 185.00, 349.00, 'BV-CANVAS-20X30'),
  ('24x30', 215.00, 399.00, 'BV-CANVAS-24X30'),
  ('24x36', 250.00, 449.00, 'BV-CANVAS-24X36'),
  ('30x40', 350.00, 599.00, 'BV-CANVAS-30X40')
) as v(size_label, supplier_cost, retail_price, sku)
where p.sku = 'BV-CANVAS'
on conflict (product_id, size_label) do nothing;

insert into public.business_settings (key, value)
values
  ('company', '{"name":"Basquin Vision","based_in":"South Florida","email":"basquinvisonfilms@gmail.com"}'),
  ('gallery_defaults', '{"expiration_days":90,"downloads_enabled":false,"purchase_enabled":true,"watermark_enabled":true}'),
  ('tax_shipping', '{"sales_tax_enabled":false,"shipping_origin":"South Florida","free_shipping_threshold":null}')
on conflict (key) do nothing;

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.galleries enable row level security;
alter table public.gallery_access enable row level security;
alter table public.media_assets enable row level security;
alter table public.favorite_collections enable row level security;
alter table public.favorites enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.invoices enable row level security;
alter table public.notifications enable row level security;

create or replace function public.has_role(required_role public.user_role)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.roles r on r.id = ur.role_id
    where ur.user_id = auth.uid()
      and r.name = required_role
  );
$$;

create or replace function public.is_admin_or_staff()
returns boolean
language sql
security definer
set search_path = public
as $$
  select public.has_role('ADMIN') or public.has_role('STAFF');
$$;

create policy "Users can view their own profile"
on public.profiles for select
using (id = auth.uid() or public.is_admin_or_staff());

create policy "Users can update their own profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "Admin and staff can manage clients"
on public.clients for all
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

create policy "Clients can see assigned projects"
on public.projects for select
using (
  public.is_admin_or_staff()
  or exists (
    select 1 from public.project_members pm
    where pm.project_id = projects.id
      and pm.profile_id = auth.uid()
      and pm.can_view = true
  )
);

create policy "Admin and staff can manage projects"
on public.projects for all
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

create policy "Project members can view memberships"
on public.project_members for select
using (profile_id = auth.uid() or public.is_admin_or_staff());

create policy "Admin and staff can manage project members"
on public.project_members for all
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

create policy "Gallery access follows project membership"
on public.galleries for select
using (
  public.is_admin_or_staff()
  or exists (
    select 1
    from public.project_members pm
    where pm.project_id = galleries.project_id
      and pm.profile_id = auth.uid()
      and pm.can_view = true
  )
);

create policy "Admin and staff can manage galleries"
on public.galleries for all
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

create policy "Media access follows project membership"
on public.media_assets for select
using (
  public.is_admin_or_staff()
  or exists (
    select 1
    from public.project_members pm
    where pm.project_id = media_assets.project_id
      and pm.profile_id = auth.uid()
      and pm.can_view = true
  )
);

create policy "Admin and staff can manage media metadata"
on public.media_assets for all
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

create policy "Users can manage their favorite collections"
on public.favorite_collections for all
using (profile_id = auth.uid() or public.is_admin_or_staff())
with check (profile_id = auth.uid() or public.is_admin_or_staff());

create policy "Users can manage favorites in their collections"
on public.favorites for all
using (
  public.is_admin_or_staff()
  or exists (
    select 1 from public.favorite_collections fc
    where fc.id = favorites.collection_id
      and fc.profile_id = auth.uid()
  )
)
with check (
  public.is_admin_or_staff()
  or exists (
    select 1 from public.favorite_collections fc
    where fc.id = favorites.collection_id
      and fc.profile_id = auth.uid()
  )
);

create policy "Users can view their orders"
on public.orders for select
using (profile_id = auth.uid() or public.is_admin_or_staff());

create policy "Users can view their invoices"
on public.invoices for select
using (profile_id = auth.uid() or public.is_admin_or_staff());
