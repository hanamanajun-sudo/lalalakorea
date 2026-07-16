# /learn 온라인 학습 기능 — Phase A 상세 설계

> 승인된 브레인스토밍: `~/.claude/plans/lalalakorea-sorted-petal.md`
> 첫 교재: **한글 기초 (ハングル基礎)** — 기존 인기 블로그 기사 재구성

---

## 1. 전체 구조

```
기존 (변경 없음, SSG 유지)          신규 (/learn 이하)
├── app/page.js                    ├── app/learn/page.js                # 교재 목록 대시보드
├── app/[slug]/page.js             ├── app/learn/[course]/page.js       # 교재 상세 (레슨 목록+진도)
├── app/category/...               ├── app/learn/[course]/[lesson]/page.js  # 레슨 본문+퀴즈
└── lib/posts.js                   ├── app/login/page.js                # 로그인 (매직링크+Google)
                                   ├── app/auth/callback/route.js       # Supabase OAuth 콜백
                                   ├── lib/courses.js                   # 교재 파싱 (posts.js 패턴 복제)
                                   ├── lib/supabase/client.js           # 브라우저용 클라이언트
                                   ├── lib/supabase/server.js           # 서버용 클라이언트
                                   └── content/courses/hangul-basic/    # 교재 콘텐츠
```

- 블로그 SSG 빌드에 영향 없음. `/learn` 레슨 페이지도 콘텐츠는 SSG, 진도 표시만 클라이언트에서 로드
- 패키지 추가: `@supabase/supabase-js`, `@supabase/ssr` 2개만

## 2. 콘텐츠 모델

### content/courses/hangul-basic/course.json
```json
{
  "id": "hangul-basic",
  "title": "ハングル基礎",
  "description": "母音・子音・パッチムを10レッスンでマスター",
  "level": "入門",
  "lessons": ["01-intro", "02-vowels-basic", "03-vowels-quiz", "..."]
}
```

### 레슨 파일: content/courses/hangul-basic/02-vowels-basic.md
```markdown
---
id: 02-vowels-basic
title: 基本母音10個をおぼえよう
quiz:
  - type: choice
    question: "「ㅏ」の発音は？"
    options: ["ア", "オ", "ウ", "イ"]
    answer: 0
    explain: "ㅏは口を大きく開けて「ア」"
  - type: choice
    question: "..."
---
（本文は既存ブログと同じmarkdown。lib/posts.jsのremarkパイプライン再利用）
```

- 퀴즈는 frontmatter의 YAML 배열 → gray-matter가 그대로 파싱. MVP는 `choice`(4지선다) 1종만
- `lib/courses.js`는 `lib/posts.js`의 remark 파이프라인(`convertBold` 포함)을 import해서 재사용

### 한글 기초 커리큘럼 초안 (10레슨)

| # | 레슨 | 소스 (기존 기사 재활용) |
|---|---|---|
| 01 | ハングルとは？ 仕組み紹介 | 신규 (짧게) |
| 02 | 基本母音10個 | `...基本母音は実は10個だけ...` 기사 |
| 03 | 基本母音 퀴즈 복습 | 02 기반 |
| 04 | 基本子音10個 | `...基本子音は実は10個だけ...` 기사 |
| 05 | 基本子音 퀴즈 복습 | 04 기반 |
| 06 | 母音+子音の組み合わせ | `...ローマ字と同じ母音と子音...` 기사 |
| 07 | 激音・濃音 | `同じ「パ」でも発音の種類が2種類...` 기사 |
| 08 | パッチム入門 | 신규 |
| 09 | 総合クイズ① 単語を読んでみよう | K-POP 아이돌 이름 읽기 (차별화 포인트) |
| 10 | 総合クイズ② 修了テスト | 신규 |

## 3. Supabase 설계

### 사전 작업 (사용자가 직접, 5분)
1. https://supabase.com 가입 → 새 프로젝트 생성 (리전: Northeast Asia (Tokyo))
2. Authentication → Providers에서 Email(매직링크) 활성화, Google OAuth 설정(선택)
3. Project Settings → API에서 URL과 anon key 복사 → Vercel 환경변수 + `.env.local`에 등록
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 테이블 + RLS (SQL Editor에 붙여넣기)
```sql
create table user_progress (
  user_id uuid references auth.users(id) on delete cascade,
  course_id text not null,
  lesson_id text not null,
  score int,
  completed_at timestamptz default now(),
  primary key (user_id, course_id, lesson_id)
);

alter table user_progress enable row level security;

create policy "own progress" on user_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```
- MVP는 `user_progress` 1테이블만. profiles는 닉네임 기능 넣을 때(Phase B) 추가

## 4. 페이지·컴포넌트 명세

| 파일 | 역할 |
|---|---|
| `app/learn/page.js` | 교재 카드 목록 (SSG). 로그인 시 클라이언트에서 진도율 오버레이 |
| `app/learn/[course]/page.js` | 레슨 목록 + 완료 체크마크 + **「続きから学習」** 버튼 (첫 미완료 레슨으로) |
| `app/learn/[course]/[lesson]/page.js` | 레슨 본문(SSG) + `<Quiz>` + 전후 레슨 네비게이션 |
| `app/learn/Quiz.js` (client) | 4지선다 진행 → 정답률 표시 → 완료 시 `user_progress` upsert. 비로그인이면 "ログインして進捗を保存" 유도 (레슨 열람 자체는 비로그인 OK) |
| `app/learn/ProgressBadge.js` (client) | 진도 표시 공용 컴포넌트 |
| `app/login/page.js` | 이메일 매직링크 폼 + Google 버튼 |
| `app/auth/callback/route.js` | `exchangeCodeForSession` 처리 |
| 헤더 수정 (`app/layout.js`) | 네비에 「学習」 링크 추가 + 로그인 상태 아이콘 (client 컴포넌트 분리) |

## 5. 구현 순서 (커밋 단위)

1. `lib/courses.js` + 교재 콘텐츠 2레슨 + `/learn` 3페이지 (로그인 없이 열람 가능한 상태) → 배포해서 확인
2. Supabase 연동: login/callback + Quiz 완료 시 진도 저장 + 「続きから」
3. 나머지 8레슨 콘텐츠 채우기 (Sonnet으로 충분)
4. 헤더에 「学習」 메뉴 + 블로그 한국어 카테고리 기사 하단에 `/learn` CTA

## 6. 검증

- `npm run build` — 기존 블로그 SSG 깨지지 않는지
- 비로그인: 레슨 열람 O, 퀴즈 풀기 O, 저장 시 로그인 유도
- 로그인 → 레슨 완료 → 로그아웃 → 재로그인 → 진도 유지 + 「続きから」 정상 동작
- Supabase 대시보드에서 RLS 동작 확인 (타 유저 데이터 접근 불가)

## 미결정 (Phase B 이후로 미룸)

- 닉네임/프로필, 스트릭·배지, 단어 복습(ts-fsrs), 유료 교재, 음성(TTS)
