-- ═══════════════════════════════════════════════════════════
-- LaLaLaKorea 学習機能 — Supabase テーブル作成
-- Supabase ダッシュボード → SQL Editor に貼り付けて Run
-- ═══════════════════════════════════════════════════════════

-- 学習進捗テーブル
create table if not exists user_progress (
  user_id uuid references auth.users(id) on delete cascade,
  course_id text not null,
  lesson_id text not null,
  score int,
  completed_at timestamptz default now(),
  primary key (user_id, course_id, lesson_id)
);

-- Row Level Security：本人のデータのみアクセス可
alter table user_progress enable row level security;

drop policy if exists "own progress" on user_progress;
create policy "own progress" on user_progress
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
