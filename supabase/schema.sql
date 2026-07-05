-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create ENUM for Plans
create type public.plan_type as enum ('FREE', 'PRO');

-- Create Users table
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  name text,
  avatar_url text,
  plan public.plan_type default 'FREE'::public.plan_type not null,
  stripe_id text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Projects table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  description text,
  game_state jsonb not null default '{}'::jsonb,
  is_public boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes
create index projects_user_id_idx on public.projects(user_id);

-- Set up Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.projects enable row level security;

-- Policies for Users
create policy "Users can view own profile."
  on public.users for select
  using ( auth.uid() = id );

create policy "Users can update own profile."
  on public.users for update
  using ( auth.uid() = id );

-- Policies for Projects
create policy "Users can view own projects."
  on public.projects for select
  using ( auth.uid() = user_id );

create policy "Users can insert own projects."
  on public.projects for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own projects."
  on public.projects for update
  using ( auth.uid() = user_id );

create policy "Users can delete own projects."
  on public.projects for delete
  using ( auth.uid() = user_id );

create policy "Anyone can view public projects."
  on public.projects for select
  using ( is_public = true );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Trigger to automatically create a user profile when a new user signs up via auth
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
