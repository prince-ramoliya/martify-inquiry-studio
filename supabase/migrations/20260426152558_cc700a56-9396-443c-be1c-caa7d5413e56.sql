
-- =================== ROLES ===================
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null default 'user',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;

create policy "Users see own roles" on public.user_roles
for select to authenticated using (auth.uid() = user_id);

create policy "Admins see all roles" on public.user_roles
for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Admins manage roles" on public.user_roles
for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Bootstrap: allow first-ever admin signup. Once any admin exists, this is closed.
create policy "First admin can self-register"
on public.user_roles for insert to authenticated
with check (
  auth.uid() = user_id
  and role = 'admin'
  and not exists (select 1 from public.user_roles where role = 'admin')
);

-- =================== UPDATED_AT helper ===================
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- =================== HERO SLIDES ===================
create table public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  eyebrow text not null default '',
  title text not null,
  italic text not null default '',
  description text not null default '',
  cta_label text not null default 'Shop now',
  cta_to text not null default '/shop',
  image_url text not null,
  accent text not null default '',
  position int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_hero_updated before update on public.hero_slides for each row execute function public.tg_set_updated_at();
alter table public.hero_slides enable row level security;
create policy "Hero public read active" on public.hero_slides for select using (active = true);
create policy "Hero admin all" on public.hero_slides for all to authenticated
using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- =================== CATEGORIES ===================
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  image_url text,
  description text default '',
  position int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_cat_updated before update on public.categories for each row execute function public.tg_set_updated_at();
alter table public.categories enable row level security;
create policy "Cat public read active" on public.categories for select using (active = true);
create policy "Cat admin all" on public.categories for all to authenticated
using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- =================== PRODUCTS ===================
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category_id uuid references public.categories(id) on delete set null,
  short_description text not null default '',
  description text not null default '',
  price numeric(10,2) not null default 0,
  mrp numeric(10,2),
  image_url text not null default '',
  gallery jsonb not null default '[]'::jsonb,
  features jsonb not null default '[]'::jsonb,
  specs jsonb not null default '[]'::jsonb,
  badge text,
  rating numeric(2,1) not null default 4.8,
  review_count int not null default 0,
  in_stock boolean not null default true,
  featured boolean not null default false,
  position int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.products(category_id);
create index on public.products(featured) where featured = true;
create trigger trg_prod_updated before update on public.products for each row execute function public.tg_set_updated_at();
alter table public.products enable row level security;
create policy "Prod public read active" on public.products for select using (active = true);
create policy "Prod admin all" on public.products for all to authenticated
using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- =================== SITE SETTINGS (singleton) ===================
create table public.site_settings (
  id int primary key default 1,
  logo_url text,
  brand_name text not null default 'MARTIFY',
  contact_phone text default '',
  contact_email text default '',
  whatsapp_number text default '',
  address text default '',
  promo_banner_image text,
  promo_banner_title text default '',
  promo_banner_subtitle text default '',
  promo_banner_cta text default 'Shop now',
  promo_banner_to text default '/shop',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into public.site_settings (id) values (1) on conflict do nothing;
create trigger trg_set_updated before update on public.site_settings for each row execute function public.tg_set_updated_at();
alter table public.site_settings enable row level security;
create policy "Settings public read" on public.site_settings for select using (true);
create policy "Settings admin update" on public.site_settings for all to authenticated
using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- =================== REALTIME ===================
alter publication supabase_realtime add table public.hero_slides;
alter publication supabase_realtime add table public.categories;
alter publication supabase_realtime add table public.products;
alter publication supabase_realtime add table public.site_settings;

-- =================== STORAGE BUCKET ===================
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Media public read" on storage.objects for select using (bucket_id = 'media');
create policy "Media admin write" on storage.objects for insert to authenticated
with check (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
create policy "Media admin update" on storage.objects for update to authenticated
using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
create policy "Media admin delete" on storage.objects for delete to authenticated
using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
