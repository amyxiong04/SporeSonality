-- USERS
create table if not exists users (
  id uuid primary key references auth.users(id),
  display_name text,
  email text unique not null,
  password_hash text,
  created_at timestamp default now()
);

-- MUSHROOMS
create table if not exists mushrooms (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique,
  description text,
  quote text,
  emoji text
);

-- QUIZ RESULTS
create table if not exists quiz_results (
  id uuid primary key default uuid_generate_v4(),
  mushroom_id uuid references mushrooms(id),
  user_id uuid references auth.users(id),
  spore_chaos integer,
  light_affinity integer,
  earthiness integer,
  social_cluster integer,
  mystique_level integer,
  created_at timestamp default now()
);
