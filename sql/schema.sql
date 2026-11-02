-- =====================================================
-- OpenSource Hub - schema.sql  (Day 1, Gunika)
-- Run in: Supabase Dashboard > SQL Editor > New query
-- =====================================================

-- 1. PROFILES (one row per auth user)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  role        text not null default 'student' check (role in ('student','admin')),
  created_at  timestamptz not null default now()
);

-- 2. PROJECTS
create table if not exists public.projects (
  id           bigint generated always as identity primary key,
  title        text not null,
  description  text,
  category     text,
  language     text,
  difficulty   text check (difficulty in ('Beginner','Intermediate','Advanced')),
  github_url   text,
  created_at   timestamptz not null default now()
);

-- 3. BOOKMARKS
create table if not exists public.bookmarks (
  id          bigint generated always as identity primary key,
  user_id     uuid   not null references public.profiles(id) on delete cascade,
  project_id  bigint not null references public.projects(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (user_id, project_id)
);

-- 4. CONTRIBUTIONS
create table if not exists public.contributions (
  id          bigint generated always as identity primary key,
  user_id     uuid   not null references public.profiles(id) on delete cascade,
  project_id  bigint not null references public.projects(id) on delete cascade,
  status      text   not null default 'Not Started'
              check (status in ('Not Started','In Progress','PR Submitted','Merged')),
  updated_at  timestamptz not null default now(),
  unique (user_id, project_id)
);

-- 5. COMMUNITY POSTS
-- user_id references profiles (not auth.users) so Harshita can join author name:
--   supabase.from('community_posts').select('*, profiles(name)')
create table if not exists public.community_posts (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  title       text not null,
  content     text not null,
  created_at  timestamptz not null default now()
);

-- =====================================================
-- TRIGGER: create a profile row on every new signup
-- Name is read from signUp options.data.name (see auth.js, Day 2)
-- =====================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    'student'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

