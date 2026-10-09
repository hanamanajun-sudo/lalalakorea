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

-- ═══════════════════════════════════════════════════════════
-- 単語復習カード（FSRS 間隔反復）
-- ═══════════════════════════════════════════════════════════
create table if not exists review_cards (
  user_id uuid references auth.users(id) on delete cascade,
  course_id text not null,
  word_ko text not null,
  word_read text,
  word_mean text,
  -- FSRS 状態
  due timestamptz not null,
  stability real,
  difficulty real,
  elapsed_days int,
  scheduled_days int,
  reps int,
  lapses int,
  learning_steps int,
  state int,
  last_review timestamptz,
  primary key (user_id, course_id, word_ko)
);

alter table review_cards enable row level security;

drop policy if exists "own cards" on review_cards;
create policy "own cards" on review_cards
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════
-- マイノートに追加した教材（「学習を始める」で自動追加）
-- ═══════════════════════════════════════════════════════════
create table if not exists user_courses (
  user_id uuid references auth.users(id) on delete cascade,
  course_id text not null,
  added_at timestamptz default now(),
  primary key (user_id, course_id)
);

alter table user_courses enable row level security;

drop policy if exists "own courses" on user_courses;
create policy "own courses" on user_courses
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════
-- レッスンの「いいね」（内部データ。管理者のみ全件閲覧可）
-- 管理者 = ログインメールが hanamanajun@gmail.com のユーザー
-- ═══════════════════════════════════════════════════════════
create table if not exists lesson_likes (
  user_id uuid references auth.users(id) on delete cascade,
  course_id text not null,
  lesson_id text not null,
  created_at timestamptz default now(),
  primary key (user_id, course_id, lesson_id)
);

alter table lesson_likes enable row level security;

drop policy if exists "own likes" on lesson_likes;
create policy "own likes" on lesson_likes
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "admin read likes" on lesson_likes;
create policy "admin read likes" on lesson_likes
  for select
  using ((auth.jwt() ->> 'email') = 'hanamanajun@gmail.com');

-- ═══════════════════════════════════════════════════════════
-- レッスンへのご意見・ご要望（未ログインでも送信可。閲覧は管理者のみ）
-- ═══════════════════════════════════════════════════════════
create table if not exists lesson_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid default auth.uid(),
  kind text not null default 'other',
  message text not null,
  created_at timestamptz default now(),
  constraint lesson_feedback_message_len check (char_length(message) between 1 and 2000),
  constraint lesson_feedback_kind_len check (char_length(kind) <= 20)
);

alter table lesson_feedback enable row level security;

drop policy if exists "anyone can send feedback" on lesson_feedback;
create policy "anyone can send feedback" on lesson_feedback
  for insert
  to anon, authenticated
  with check (user_id is null or user_id = auth.uid());

drop policy if exists "admin read feedback" on lesson_feedback;
create policy "admin read feedback" on lesson_feedback
  for select
  using ((auth.jwt() ->> 'email') = 'hanamanajun@gmail.com');

drop policy if exists "admin delete feedback" on lesson_feedback;
create policy "admin delete feedback" on lesson_feedback
  for delete
  using ((auth.jwt() ->> 'email') = 'hanamanajun@gmail.com');
