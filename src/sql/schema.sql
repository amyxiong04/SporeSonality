create table if not exists mushrooms (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique,
  description text,
  quote text,
  emoji text
);

create table if not exists quiz_results (
  id uuid primary key default uuid_generate_v4(),
  mushroom_id uuid references mushrooms(id),
  spore_chaos int,
  light_affinity int,
  earthiness int,
  social_cluster int,
  mystique_level int,
  created_at timestamp default now()
);
