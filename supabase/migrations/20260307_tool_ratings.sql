-- Tool ratings for WebApplication schema (Product snippet rich results)
create table if not exists tool_ratings (
  id uuid default gen_random_uuid() primary key,
  tool_slug text not null,
  rating smallint not null check (rating between 1 and 5),
  fingerprint text not null,
  created_at timestamptz default now()
);

-- One rating per tool per visitor
create unique index tool_ratings_unique on tool_ratings (tool_slug, fingerprint);

-- Fast aggregate lookups
create index tool_ratings_slug on tool_ratings (tool_slug);

-- RLS: anyone can insert, no one can read individual rows
alter table tool_ratings enable row level security;

create policy "Anyone can submit a rating"
  on tool_ratings for insert
  with check (true);

-- Aggregates exposed via rpc function (no direct table read)
create or replace function get_tool_rating(p_tool_slug text)
returns json as $$
  select json_build_object(
    'ratingValue', round(avg(rating)::numeric, 1),
    'ratingCount', count(*)::int
  )
  from tool_ratings
  where tool_slug = p_tool_slug;
$$ language sql stable security definer;

-- Batch: get all tool ratings at once
create or replace function get_all_tool_ratings()
returns json as $$
  select coalesce(
    (select json_object_agg(tool_slug, json_build_object(
      'ratingValue', rating_avg,
      'ratingCount', rating_count
    ))
    from (
      select tool_slug, round(avg(rating)::numeric, 1) as rating_avg, count(*)::int as rating_count
      from tool_ratings
      group by tool_slug
    ) agg),
    '{}'::json
  );
$$ language sql stable security definer;
