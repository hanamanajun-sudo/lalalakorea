# LaLaLaKorea 作業進捗

---

## 2026-06-16 / 17 の作業内容

### SEO監査 → 全項目修正・デプロイ完了

#### 対応した問題

| # | 内容 | ファイル |
|---|---|---|
| 1 | `logo.png` が存在しない → `og-default.png` に差し替え（JSON-LDエラー解消） | `app/[slug]/page.js` |
| 2 | サイト名の表記ゆれ `LalaLaKorea` → `LaLaLaKorea` に統一 | `app/[slug]/page.js`, `app/about/page.js` |
| 3 | カテゴリページに OG / Twitter メタデータがなかった → 追加 | `app/category/[name]/page.js` |
| 4 | `/contact` `/privacy` がサイトマップに未登録 → 追加 | `app/sitemap.js` |
| 5 | `/search` ページがクロール可能だった → `robots.txt` で disallow | `app/robots.js` |
| 6 | 읽기 시간 표시 추가 — 포스트 날짜 옆에「約○分で読めます」표시 (400자/분 기준) | `lib/posts.js`, `app/[slug]/page.js` |
| 7 | ページネーション canonical 미설정 → ホーム・カテゴリ両方を`generateMetadata`に変更し、ページごとに自身のURLをcanonicalに設定 | `app/page.js`, `app/category/[name]/page.js` |
| 8 | `**bold**` が日本語・韓国語の記号隣接で表示されないバグ修正 → remark処理後に`<strong>`へ変換する後処理を追加 | `lib/posts.js` |

#### その他確認事項
- AdSense コード (`ca-pub-6443201130119317`) はすでに `app/layout.js` に挿入済み
- AdSense 審査ステータス：**準備中**（正常。結果はメールで通知）

---

## 완료된 항목 (CLAUDE.md Phase 1 기준)

- [x] sitemap.xml 자동 생성
- [x] robots.txt 설정
- [x] OG 이미지 폴백
- [x] 예상 읽기 시간 표시
- [x] SEO 전체 감사 및 수정 (사이트명·JSON-LD·canonical·OG)
- [x] AdSense 코드 삽입

---

## 2026-07-16 の作業内容

### 온라인 언어학습 기능 — 사전 조사 & 브레인스토밍 완료

- 방향 확정: 기존 사이트 내 `/learn` 섹션 + **Supabase**(Auth + PostgreSQL, 무료 티어) 조합
- 콘텐츠 모델: 교재(Course) → 단원(Unit) → 레슨(Lesson) → 문제(Exercise), 기존 markdown 파이프라인 확장
- 로드맵: Phase A(MVP: 교재 1개+로그인+진도 저장) → B(교재 확장+블로그 CTA) → C(ts-fsrs 단어 복습+게이미피케이션+유료화)
- 핵심 참고: [sanidhyy/duolingo-clone](https://github.com/sanidhyy/duolingo-clone) (MIT, 아키텍처), [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) (간격 반복)
- 상세 문서: `C:\Users\hanam\.claude\plans\lalalakorea-sorted-petal.md`

---

## 다음에 할 일

### 학습 기능 Phase A — 구현 진행 중
- [x] Supabase 프로젝트 생성 (Tokyo 리전) + 환경변수(로컬 `.env.local` + Vercel) 등록
- [x] Supabase 클라이언트 (client/server/middleware) + `@supabase/ssr` 도입
- [x] `lib/courses.js` 교재 파싱 (posts.js remark 파이프라인 재사용)
- [x] 한글 기초 교재: course.json + 레슨 3개 (intro / 기본모음 / 모음퀴즈)
- [x] `/learn` 3페이지 (대시보드·교재상세·레슨) + 진도 표시 컴포넌트
- [x] Quiz 컴포넌트 (4지선다 + 정답률 + Supabase 진도 저장 + 비로그인 유도)
- [x] 로그인(매직링크) + auth 콜백 + 헤더 「学習」 메뉴 & 로그인 버튼
- [x] `npm run build` 통과 + 로컬 동작 확인 (모든 라우트 200)
- [ ] **Supabase 테이블 생성** — `supabase-setup.sql`을 SQL Editor에 붙여넣고 Run (사용자 작업)
- [ ] **Supabase 이메일 인증 리다이렉트 URL 설정** — Authentication → URL Configuration에 사이트 URL 등록
- [ ] 나머지 7레슨 콘텐츠 채우기 (자음·조합·격음/농음·받침·종합퀴즈)
- [ ] 블로그 한국어 카테고리 기사 하단에 `/learn` CTA

### 우선순위 높음
- [ ] **`/store` 페이지 추가** — note.com PDF 판매 랜딩 페이지 (Phase 3 수익화)
  - 구조: 문제 제기 → 공감 → 무료 샘플 20문장 → 상품 소개 → 구매 버튼
  - note.com 출품 후 링크 연결

### 우선순위 중간
- [ ] **WebSite JSON-LD 추가** (`layout.js`) — Google 사이트링크 검색박스 대응
- [ ] **관련 블로그 글 하단 CTA 삽입** — PDF 구매 유도 버튼

### 우선순위 낮음 (Phase 4)
- [ ] 홈 히어로 섹션 개선
- [ ] 카드 hover 애니메이션 통일
- [ ] 모바일 플로팅 TOC 버튼

---

*最終更新: 2026-06-17*
