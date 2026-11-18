

create table if not exists public.listing_moderators (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);


create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', '')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_auth_user();

-- Backfill profiles for account
insert into public.profiles (user_id, display_name)
select
  id,
  coalesce(raw_user_meta_data ->> 'display_name', '')
from auth.users
on conflict (user_id) do nothing;

create table if not exists public.listings (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null,
  category text not null check (
    category in ('business', 'real_estate', 'land')
  ),
  region text not null,
  price_usd numeric(14, 2) check (price_usd is null or price_usd >= 0),
  price_negotiable boolean not null default false,
  image_url text,
  status text not null default 'draft' check (
    status in ('draft', 'published', 'archived')
  ),
  created_by uuid not null references auth.users (id),
  created_at timestamptz not null default now()
);

create table if not exists public.listing_favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  listing_id bigint not null references public.listings (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

alter table public.listing_moderators enable row level security;
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.listing_favorites enable row level security;

drop policy if exists "Users can view their own moderator record"
  on public.listing_moderators;
create policy "Users can view their own moderator record"
  on public.listing_moderators
  for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles
  for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "Published listings are public" on public.listings;
create policy "Published listings are public"
  on public.listings
  for select
  to anon, authenticated
  using (
    status = 'published'
    or exists (
      select 1
      from public.listing_moderators
      where user_id = (select auth.uid())
    )
  );

drop policy if exists "Moderators can insert listings" on public.listings;
create policy "Moderators can insert listings"
  on public.listings
  for insert
  to authenticated
  with check (
    created_by = (select auth.uid())
    and exists (
      select 1
      from public.listing_moderators
      where user_id = (select auth.uid())
    )
  );

drop policy if exists "Moderators can update listings" on public.listings;
create policy "Moderators can update listings"
  on public.listings
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.listing_moderators
      where user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.listing_moderators
      where user_id = (select auth.uid())
    )
  );

drop policy if exists "Moderators can delete listings" on public.listings;
create policy "Moderators can delete listings"
  on public.listings
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.listing_moderators
      where user_id = (select auth.uid())
    )
  );

drop policy if exists "Users can view their own favorites"
  on public.listing_favorites;
create policy "Users can view their own favorites"
  on public.listing_favorites
  for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Users can favorite published listings"
  on public.listing_favorites;
create policy "Users can favorite published listings"
  on public.listing_favorites
  for insert
  to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1
      from public.listings
      where id = listing_id
        and status = 'published'
    )
  );

drop policy if exists "Users can remove their own favorites"
  on public.listing_favorites;
create policy "Users can remove their own favorites"
  on public.listing_favorites
  for delete
  to authenticated
  using (user_id = (select auth.uid()));

revoke all on public.listing_moderators from anon, authenticated;
revoke all on public.profiles from anon, authenticated;
revoke all on public.listings from anon, authenticated;
revoke all on public.listing_favorites from anon, authenticated;

grant select on public.listings to anon, authenticated;
grant insert, update, delete on public.listings to authenticated;
grant select on public.listing_moderators to anon, authenticated;
grant select on public.profiles to authenticated;
grant update (display_name) on public.profiles to authenticated;
grant select, insert, delete on public.listing_favorites to authenticated;

create table if not exists public.applications (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  service text not null check (
    service in (
      'Продаж бізнесу',
      'Венчурні інвестиції',
      'Кредитування бізнесу',
      'Терміновий викуп бізнесу'
    )
  ),
  name text not null check (char_length(name) between 1 and 100),
  phone text not null check (char_length(phone) between 1 and 40),
  message text not null default '' check (char_length(message) <= 2000),
  created_at timestamptz not null default now()
);

alter table public.applications enable row level security;
revoke all on public.applications from anon, authenticated;
grant insert, select on public.applications to authenticated;
grant usage, select on sequence public.applications_id_seq to authenticated;

drop policy if exists "Users can submit applications for themselves"
  on public.applications;
create policy "Users can submit applications for themselves"
  on public.applications
  for insert
  to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "Users and moderators can view applications"
  on public.applications;
create policy "Users and moderators can view applications"
  on public.applications
  for select
  to authenticated
  using (
    user_id = (select auth.uid())
    or exists (
      select 1
      from public.listing_moderators
      where user_id = (select auth.uid())
    )
  );
