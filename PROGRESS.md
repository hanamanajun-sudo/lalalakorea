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

## 2026-07-17 の作業内容（後半）— Phase C・デザイン全面刷新・教材拡充

### 오늘 한 일

1. **학습 기능 Phase C 구현** — 스트릭/배지, 단어 복습(FSRS), 학습노트, 단어팩
2. **디자인 전면 개편** — 프리미엄 톤 → 로즈 → **파스텔**(10·20대 여성 타겟)로 3단계 재색상, 이모지 → **Phosphor Icons** 전환
3. **사이드 내비게이션 계층화** + `/learn` 대시보드 재구성 (통계 컴팩트화 + 학습노트 버튼 통합)
4. **교재 2·3호 콘텐츠 제작** — 推し活 한국어(6레슨), 팬레터 쓰기(6레슨)
5. **배포 장애 트러블슈팅** — GitHub API 장애 + `client.js`의 TS 문법(`!`) 버그로 배포가 멈췄던 것을 진단·수정
6. **사이트 전체 파스텔 통일** — 학습 섹션뿐 아니라 블로그 헤더·홈·카테고리 히어로까지 전부 재색상 (기존 브랜드였던 빨강 계열을 사용자 승인 하에 전면 교체)
7. **학습 홍보 배너 신설 + A/B 테스트** — CSS 버전 vs AI 생성 일러스트(banner01.png) 버전을 50/50 랜덤 노출, GA4 이벤트로 추적, "무료·같은 사이트 내" 신뢰 배지 추가
8. **GA4 커스텀 측정기준(`banner_variant`) 등록** — variant별 클릭률 비교 가능하도록 설정
9. **note.com 판매 연동 전략 문서화** — [NOTE_STRATEGY.md](NOTE_STRATEGY.md)
10. **BTS「Swim」글 썸네일 교체** — 곡 테마에 맞춰 대형 범선 이미지로 변경

### 완료된 항목

- [x] 학습 대시보드에 연속 학습일수·완료 레슨수·배지 5종 표시 (`LearnStats.js`)
- [x] 단어 복습 기능 — `ts-fsrs` 간격 반복 알고리즘, `review_cards` 테이블 + RLS, `/learn/review` 플래시카드 UI
- [x] 학습노트 허브 (`/learn/notes`) — 교재 진행률 + 내 단어장(정착 상태·다음 복습일)
- [x] 단어팩 기능 — K-POP 응원어·여행 카페·인사말 3팩(30단어), `/learn/packs`, 복습에 추가 가능
- [x] 사이드바 계층 재구성 (학습톱→학습노트, 한글레슨, 단어복습→단어팩) + `/learn/lessons` 신설
- [x] 전체 파스텔 재색상 (학습 섹션 + 블로그 헤더/홈/카테고리 전체), Phosphor Icons 전면 적용
- [x] 교재 2호 「推し活で使える韓国語」 전 6레슨 (덕질·응원·SNS·칭찬·축하·수료)
- [x] 교재 3호 「推しにファンレターを書こう」 전 6레슨 (인사→마음→맺음말→완성→수료)
- [x] Vercel 배포 중단 트러블슈팅 (GitHub API 장애 확인 + `lib/supabase/client.js`의 TS 비-null 단언 문법 오류 수정)
- [x] 구글 로그인 버튼을 로그인 폼에 추가 (매직링크와 병행)
- [x] 기사 상단 학습 홍보 배너 (`LearnBanner.js`) + A/B 테스트(CSS/이미지) + GA4 이벤트 추적
- [x] GA4 커스텀 측정기준 `banner_variant` 등록 (2026-07-17, 이 시점 이후 데이터만 variant별 분석 가능)
- [x] note.com 판매·콘텐츠 운영 전략 기록 (`NOTE_STRATEGY.md`)
- [x] BTS 곡 관련 글 썸네일을 곡 테마(수영/바다)에 맞춰 범선 이미지로 교체

---

## 2026-07-26 の作業内容 — 메인페이지 학습 배너 추가

### 오늘 한 일

1. **`LearnBanner.js` 출처 확인** — 기존 기사 상단 배너(A/B 테스트)가 이전 세션의 Claude(Opus 4.8)가 만든 기능임을 커밋 로그(`fe6fdb5`, `f2ab12a`)로 확인
2. **가입자 이메일 패턴 문의 대응** — `a.r.ne.e.st` 식으로 점이 많은 Gmail 가입 2건에 대해, Gmail의 "점 무시" 특성을 이용한 중복 가입(본인 테스트 또는 폼 스캔 봇)일 가능성이 높다고 설명. 코드 변경 없음, 이메일 인증 여부·학습 활동 유무로 판별하는 방법 안내
3. **메인페이지 배너 위치 논의 → 목업 비교 → 확정**
   - 1차: 히어로와 카테고리 버튼 사이에 배너 추가 (구현 후 재검토)
   - 2차: 실제 사이트 스타일 그대로 재현한 비교 목업(Artifact)을 만들어 "히어로 대체" vs "히어로 안에 삽입" 두 안을 시각적으로 비교
   - 3차: 히어로/텍스트배너/이미지배너 3단 랜덤 로테이션 실험 (`HomeHeroRotator.js`) — 그러나 H1이 사라지는 경우가 생겨 SEO 우려로 폐기
   - 최종: **히어로(H1 항상 고정 노출) → 카테고리 버튼 → 학습 배너(텍스트/이미지 50:50 로테이션) → 글 목록** 순서로 확정
4. **`LearnBanner.js` 공용화** — `app/[slug]/LearnBanner.js` → `app/LearnBanner.js`로 이동, 기사 상세페이지와 홈페이지 양쪽에서 공유
5. **빌드/렌더 검증** — `npm run build` 통과, 로컬 dev 서버로 SSR HTML에 히어로 `<h1>`이 항상 포함되는지, DOM 순서(히어로→배너→카테고리 아님, 최종은 히어로→카테고리→배너→글목록)가 의도대로인지 curl로 직접 확인
6. **커밋 & 푸시 완료** — origin/main에 반영, Vercel 자동배포 대기 중

### 완료된 항목

- [x] 메인페이지에 학습 홍보 배너 추가 위치 확정 (히어로 아래, 카테고리 버튼과 글 목록 사이)
- [x] `LearnBanner.js`를 기사 상세페이지와 홈페이지 공용 컴포넌트로 정리 (`app/LearnBanner.js`)
- [x] 배치안 비교용 실사이트 스타일 목업 Artifact 제작
- [x] `npm run build` 통과 확인 + SSR 렌더 결과(curl)로 최종 배치 검증
- [x] git 커밋 + `origin/main` 푸시 완료
- [x] 가입자 이메일 점 표기 패턴(스팸 여부) 문의 답변

---

## 다음에 할 일

### 2026-07-26 이후 확인할 것
- [ ] **배포 확인** — Vercel 배포 완료 후 실제 lalalakorea.com에서 메인페이지 배너(텍스트형/이미지형) 로테이션 눈으로 확인
- [ ] **홈 배너 클릭률도 GA4에서 확인** — 현재는 기사 상세페이지 배너와 이벤트명(`learn_banner_impression`/`click`)을 공유하므로, 필요시 홈/게시글 구분 파라미터 추가 고려
- [ ] **가입자 이메일 모니터링** — 점 표기(`a.r.ne.e.st` 등) 가입 계정의 이메일 인증 여부·학습 활동(`user_progress`/`review_cards`) 있는지 Supabase 대시보드에서 확인, 어뷰징 패턴 늘어나면 이메일 인증 필수화·캡차 도입 검토


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
- [x] Supabase 이메일 인증 리다이렉트 URL 설정 (URL Configuration)
- [x] 구글 OAuth 로그인 추가 (Google Cloud Console + Supabase Provider 설정 완료, 동작 확인)
- [x] 구글 로그인 + 진도 저장 실제 동작 확인 ✅
- [ ] **가입 축하 메일** — 신규 가입 시 간단한 환영 메일 발송
  - 방법 후보 ①: Supabase Auth 이메일 템플릿 커스터마이즈 (매직링크 메일 문구를 환영조로)
  - 방법 후보 ②: Supabase Auth Hook (Send Email Hook) or DB Webhook → Resend/메일 서비스로 환영 메일
  - 무료 범위: Resend 무료 티어(월 3,000통) + `auth.users` insert 트리거 조합이 깔끔
- [x] 한글 기초 교재 10레슨 완결 (자음·조합·격음/농음·받침·K-POP이름·수료테스트)
- [x] 블로그 한국어 카테고리 기사 하단에 `/learn` CTA 배너 추가

### 우선순위 높음
- [x] 학습 교재 3개 완성 (한글 기초 / 推し活 한국어 / 팬레터 쓰기) + 단어팩 3개
- [x] Phase C 완료 (스트릭·배지 / 단어 복습 FSRS / 학습노트 / 단어팩)
- [x] 사이트 전체 디자인 파스텔 통일 + 학습 홍보 배너 + A/B 테스트 인프라
- [ ] **GA4 배너 A/B 테스트 결과 확인** — 1~2주 데이터 쌓인 후 확인 (메모리에 기록됨, 새 세션에서도 이어서 안내 가능)
  - `banner_variant`(css/image) 별 `learn_banner_impression` 대비 `learn_banner_click` 비율(CTR) 비교
  - GA4 → 탐색(Explore) → 자유 형식, 측정기준에 `banner_variant` 추가해서 확인
- [ ] **가입 축하 메일** — 신규 가입 시 환영 메일 (Resend 연동 필요, 미착수)
- [ ] **note.com 판매·CTA 연동** — 전략 문서화 완료 → [NOTE_STRATEGY.md](NOTE_STRATEGY.md)
  - 운영 방침: 블로그=SEO엔진, note=커뮤니티+판매 / 같은 글 복붙 금지, note용 재작성
  - 실행 체크리스트: `/store` 랜딩 + 기사 하단 CTA + 교재 수료 CTA + 무료 샘플 배포
  - 학습 교재가 유료 PDF의 미끼(lead magnet) — 팬레터 교재 → 문례집 PDF 연결이 최적

### 우선순위 중간
- [ ] **WebSite JSON-LD 추가** (`layout.js`) — Google 사이트링크 검색박스 대응
- [ ] **관련 블로그 글 하단 CTA 삽입** — PDF 구매 유도 버튼
- [ ] A/B 테스트 승자 확정 후 `LearnBanner.js`의 랜덤 로직 제거하고 단일 버전으로 정리
- [ ] 교재 4호 이상 검토 (드라마 표현 한국어 등, `/learn/lessons`에 계속 추가 가능한 구조로 설계됨)

### 우선순위 낮음 (Phase 4)
- [ ] 홈 히어로 섹션 개선
- [ ] 카드 hover 애니메이션 통일
- [ ] 모바일 플로팅 TOC 버튼

---

*最終更新: 2026-07-26*
