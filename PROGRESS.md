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

## 2026-07-27 の作業内容 — SEO 색인 누락 진단 및 해결

### 배경
서치콘솔에서 74건 미색인(리디렉션 55 / 발견됨 13 / 크롤링됨 6) 확인 → 원인 진단 후 순차적으로 수정·배포.

### 오늘 한 일

1. **기술 환경 자체 진단** — URL 분석이 아니라 로컬 코드베이스 직접 확인으로 Next.js 14 App Router / SSG / Vercel 구조 파악
2. **트레일링 슬래시 버그 발견·수정** — sitemap.js·canonical·og:url·JSON-LD 전체가 `/slug/`(슬래시 有)를 가리키는데 실제 서빙은 `/slug`(슬래시 無) → 308 자기 리디렉션이던 문제. 라이브 프로덕션에서 curl로 직접 재현 확인 후 수정
3. **"리디렉션이 포함된 페이지" 55건 CSV 분석** — 매력(매력) 게시글 파일명 앞에 숨은 zero-width space가 있어 raw 슬러그가 되던 버그 발견, `slug:` frontmatter로 정리
4. **"발견됨-미크롤링" 13건 CSV 분석** — 발행 속도가 크롤 예산을 추월, 홈 페이지네이션(`/?page=2`)이 쿼리스트링이라 사이트맵에 안 잡힘, 2021년 고아 페이지 1건 발견
5. **"크롤링됨-미색인" 6건 CSV 분석** — 얇은 콘텐츠 아님(4천~1.3만자), 대신 한글 기초 콘텐츠 5개 글의 제목·발췌문이 거의 동일한 자기잠식(cannibalization) 클러스터로 확인
6. **카테고리 sitemap lastmod 정확화** — 항상 "지금 시각"으로 찍히던 걸 카테고리 내 최신 게시일 기준으로 계산하도록 수정
7. **실적(Performance) CSV 분석** — `trip.lalalakorea.com`(별도 사이트)이 섞여있어 필터링 후 분석. `simkunkorean60`이 압도적 트래픽 1위(클릭 965) 확인
8. **신규 게시글 작성** — `simkunkorean60`(반말 표현)을 검색·클릭한 독자의 후속 궁금증("이거 오시에게 써도 되나?")을 겨냥한 `korean-simkung-jondetmal` 작성, `post-reviewer` 에이전트 QC(발음 표기 오류 1건 수정) 후 게시
9. **미크롤링 대상 전체에 내부링크 라운드** — 한글 기초 5개 글을 시리즈 내비게이션으로 완전 연결(기존에 일부만 텍스트로 언급되고 링크가 빠져있던 것 완성), yuns-kitchen-1↔yuns-kitchin2 상호링크, NiziU/RIIZE 글에 최신 K-pop 글에서 역링크, 나머지 5건(bingsu-guide 등)에 관련 허브 글(korean-beer, korean-suwon-city)에서 링크 연결
10. **www→apex 307 리디렉션 원인 규명** — Vercel 공식 문서 확인 결과 대시보드의 "Redirect to" 기능엔 영구/임시 선택 옵션이 없고, 항상 307로 나가는 게 정상 동작. `next.config.mjs`엔 이미 `permanent:true`(308)로 올바르게 코딩돼 있으나, Vercel 플랫폼 리디렉션이 앱보다 먼저 요청을 가로채서 앱 코드가 실행조차 안 되는 게 원인. 해결책(Domains → www 항목 → Redirect to를 None으로 변경)은 안내했으나 **실행은 보류**(사용자가 우선순위 낮다고 판단, 실질적 영향 미미함을 확인 후 보류 결정)

### 완료된 항목

- [x] 트레일링 슬래시 제거 — sitemap/canonical/og:url/JSON-LD 전체 (`a9e6912`)
- [x] 매력 게시글 ZWSP 슬러그 정리 (`f189b6d`)
- [x] 카테고리 sitemap lastmod 정확화 (`6c5e401`)
- [x] 신규 게시글 `korean-simkung-jondetmal` 게시 + `simkunkorean60` 역링크 (`6883401`)
- [x] 미크롤링 게시글 전체(한글기초 시리즈 5건, yuns-kitchen, NiziU/RIIZE, 식음료·여행 6건) 내부링크 라운드 (`9ab640f`)
- [x] www 307 리디렉션 원인 규명 + 해결 절차 문서화 (Vercel 공식 문서 확인 포함)
- [x] www 307 미해결 시 실질적 불이익 여부 확인·답변 (거의 없음, 우선순위 낮음으로 결론)

---

## 2026-07-31 の作業内容 — 감정표현 블로그 리라이트 + 학습 교재 4호 신규 추가

### 오늘 한 일

1. **`kdrama-phrases-collection` 블로그 글 리라이트** — 10선 → 14선으로 확장 (헐·사이다·고구마·소름·인정·실화냐 추가), 헐의 유래에 관한 「豆知識」콜아웃 신설, 도입부를 기존 사이트 채팅버블 UI(`chat-msg`)로 재구성
2. **`content-review` 스킬로 신규 글 검토** — 팩트체크·SEO·AI저품질 3관점 확인, 이슈는 thumbnail 필드 누락 1건만 발견(그 외 정상)
3. **`add-thumbnail` 스킬로 썸네일 추가** — Unsplash에서 이미지 검색 시 1차 결과가 존재하지 않는 사진 ID(할루시네이션)였음을 발견 → 검색결과 페이지에서 직접 URL 재확인 후 재다운로드, 1200x630/79KB로 최적화 (기존 게시글 컨벤션과 동일)
4. **`/learn` 학습 교재 4호 「ドラマで身につく感情表現」 신규 기획 및 구현** — 기존 `content/courses/` 구조(course.json + 레슨별 `.md`) 조사 후, 블로그 글의 14개 표현을 그대로 옮기지 않고 놀람/위로/사과·애정/짜증/SNS슬랭 5개 테마로 재구성한 6레슨·전20단어 코스로 제작 (세상에·힘내·고마워·미치겠어·킹정 5개 보너스 단어 추가, 레슨마다 실전 미니회화·존댓말 단계표·「豆知識」콜아웃 삽입)
5. **코스 유료화 여부 논의 → 무료 유지로 결론** — `/learn`엔 아직 결제/접근제한 인프라가 전혀 없고("premium-card"는 CSS 네이밍일 뿐), CLAUDE.md에 이미 기록된 "결제는 자체 개발 안 하고 note.com 아웃링크" 방침과도 배치되어 유료화 보류. 대신 콘텐츠 밀도를 높이는 쪽으로 방향 결정
6. **블로그 글 ↔ 신규 코스 상호 내부링크 연결** — 글 하단에 코스 CTA 콜아웃 삽입
7. **Search Console/sitemap 관련 질문 대응** — `/learn` 페이지가 sitemap.xml에는 빠져있지만 전역 헤더 nav에 이미 링크돼 있어 크롤링 자체는 문제없음을 확인, sitemap 등록은 순위 요인이 아니라 발견속도·GSC 모니터링 편의 문제라고 설명 → 사용자 판단으로 추가 보류
8. **빌드 검증 + git 커밋 2건 + `origin/main` 푸시 완료**

### 완료된 항목

- [x] `kdrama-phrases-collection` 10선 → 14선 리라이트 + 채팅버블 UI 적용
- [x] `content-review` 스킬 검토 (팩트/SEO/AI저품질 이슈 없음, thumbnail 누락만 확인)
- [x] `add-thumbnail` 스킬로 썸네일 추가 (Unsplash 재검증 후 1200x630/79KB)
- [x] `/learn` 교재 4호 「ドラマで身につく感情表現」 신규 제작 (6레슨, 20단어, 블로그 대비 5개 보너스 단어)
- [x] 교재 유료화 여부 검토 → note.com 아웃링크 방침과 배치되어 무료 유지로 결정
- [x] 블로그 글 ↔ 신규 코스 상호 내부링크
- [x] sitemap.xml `/learn` 미등록 확인 + 실질적 영향(순위 무관, 발견속도만) 설명 → 보류
- [x] `npm run build` 통과 확인 + git 커밋 2건 + push 완료

---

## 다음에 할 일

### 2026-07-27 SEO 후속 작업
- [ ] **(선택, 낮은 우선순위) www→apex 리디렉션 307→308** — Vercel 대시보드 Settings → Domains → `www.lalalakorea.com` → Edit → "Redirect to"를 None으로 변경. 실질적 영향은 미미하다고 판단해 보류 중이나, 나중에 여유 있을 때 처리 가능. 완료 시 `curl -I https://www.lalalakorea.com/`로 308 확인
- [ ] **GSC 커버리지 리포트 재확인** — 1~2주 후 "리디렉션이 포함된 페이지"(55건) / "발견됨"(13건) / "크롤링됨"(6건) 수치가 줄어드는지 추적. sitemap.xml은 이미 자동 재읽기 중이라 별도 재제출 불필요
- [ ] **(선택) 한글 기초 5개 글 실제 통합 여부 재검토** — 이번엔 삭제 없이 시리즈 링크로만 연결(안전한 접근). 그래도 색인 문제가 안 풀리면 다음 단계로 실제 병합+리디렉션 고려
- [ ] **(선택) 남은 실적 데이터 기반 추가 내부링크 라운드** — 필요시 페이지.csv 재검토해서 우선순위 조정

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
- [x] 교재 4호 「ドラマで身につく感情表現」 제작 완료 (2026-07-31, `kdrama-emotion`) — 이후 5호 이상도 같은 구조로 계속 추가 가능

### 우선순위 낮음 (Phase 4)
- [ ] 홈 히어로 섹션 개선
- [ ] 카드 hover 애니메이션 통일
- [ ] 모바일 플로팅 TOC 버튼

---

## 2026-08-08 / 09 の作業内容 — 게시글 수정 + Cloudflare Workers 이전 완료

### 오늘 한 일

1. **`oshi-katsu-vocabulary` 게시글 수정** — 韓国観光公社 참고링크 삭제, kpop-korean-slang-2026 참고링크의 잘못된 제목(실제와 다른 가짜 제목) 정정, Unsplash 썸네일 추가, `/learn/oshikatsu-korean` 학습 레슨 링크 추가 (`5dd2a36`)
2. **`korean-learning-apps-2026` 팩트체크 반영** — LingoDeer 프리미엄 가격을 2020년 기준 옛 수치(月額1,200円)에서 2026년 실제 가격($14.99〜)으로 갱신, "스피킹 연습 기회 적음" 서술을 최근 업데이트 반영해 수정, TTMIK "10段階" 근거 불명확한 구체 수치를 순화된 표현으로 변경 (`00ee209`)
3. **네이티브 앱(RN/Expo) 전환 가능성 상담** — 학습 탭을 안드로이드 앱으로 만드는 방안 논의. Capacitor/TWA/RN·Expo 비교, EAS 무료 티어 한도(빌드 15회/월, Update 1,000 MAU/월)와 로컬 빌드로 우회 가능함을 확인, Expo의 비즈니스 모델(SDK 오픈소스 무료+EAS 유료, Vercel과 동일 구조)을 설명 — **결론은 다음 세션 이후로 보류**, 코드 작업은 없음
4. **Vercel Hobby 플랜 상업적 사용 정책 확인** — 공식 fair-use 문서에서 "AdSense 포함 광고 게재는 명시적으로 상업적 사용"이라는 조항 확인 → lalalakorea에 AdSense가 이미 붙어있어 **Pro 플랜 전환이 약관상 필요**하다고 안내 (실행은 사용자 판단으로 보류)
5. **Cloudflare 이전 사전 점검** — 코드베이스 감사로 두 가지 확정 리스크 발견: ①`public/wp-content/uploads/wp-statistics/`의 57MB GeoLite2 DB가 Cloudflare 25MiB 파일 제한 초과, ②홈/카테고리 페이지네이션이 `searchParams` 사용으로 매 요청마다 동적 렌더링되며 그때마다 `fs`로 마크다운 재읽기
6. **페이지네이션 정적 라우트 전환 + 미사용 파일 제거** — `?page=N` 쿼리스트링 → `/page/N`·`/category/[name]/page/N` 정적 라우트로 전환(빌드 시점에만 fs 읽도록), 구 URL은 308 리디렉션 처리, wp-statistics 폴더 삭제 (`f07c940`)
7. **Cloudflare Workers 실배포 준비** — `@opennextjs/cloudflare` 설치 시 최신 버전(1.20.x)이 Next.js 15+ 요구함을 발견 → Next 14.2.35와 호환되는 `1.15.1`로 특정 설치. `wrangler.jsonc`, `open-next.config.ts`, `cf:preview`/`cf:deploy` 스크립트 추가
8. **Windows 빌드 크래시 우회** — `opennextjs-cloudflare build`가 Git Bash(exit 127)·PowerShell(네이티브 크래시) 양쪽에서 실패 확인(공식적으로 알려진 Windows 비호환 이슈) → WSL(Ubuntu)에 프로젝트 복사 후 그쪽에서 빌드, 결과물만 Windows로 복사해오는 방식으로 우회
9. **런타임 `fs` 의존성 완전 제거 (핵심 작업)** — Cloudflare Workers 배포 후 `readdir '/bundle/content/posts'` 에러 발생 확인. `lib/posts.js`뿐 아니라 `lib/courses.js`·`lib/wordpacks.js`도 동일하게 런타임 fs를 쓰고 있었음을 발견 → 3개 파일 전부 빌드 시점 JSON 생성(`scripts/generate-{posts,courses,wordpacks}-data.mjs`, `prebuild`/`predev` 훅으로 자동 실행) + 런타임엔 JSON import만 하는 구조로 리팩터링. 리팩터링 도중 `getAllCourses()`의 `lessons` 필드 타입 회귀(문자열 배열 → 객체 배열로 잘못 변경)를 로컬 빌드 에러로 조기 발견·수정 (`77c6a5b`)
10. **OpenNext Cloudflare 라우팅 버그 발견·회피** — `/page/[num]` 라우트 추가 후 전체 사이트가 `Expected "page" to match...` 에러로 500 발생 → 원인이 `next.config.mjs`의 `destination: '/page/:page'` 리디렉션(경로 세그먼트명 "page"가 어댑터 내부와 충돌)임을 격리 테스트로 특정, 해당 리디렉션 2건 제거로 해결 (`/page/N` 라우트 자체는 정상 동작, 구 `?page=` URL 리디렉션만 사라짐)
11. **Cloudflare Workers에 실배포 + 전체 라우트 검증** — `lalalakorea.hanamanajun.workers.dev`에 배포, 홈/포스트/카테고리/학습 코스·레슨·단어팩/검색/사이트맵/robots/CMS OAuth 리디렉션까지 curl로 전수 점검. 시크릿 5종(GitHub OAuth, Supabase) 등록 시 `.dev.vars`의 값에 따옴표가 그대로 포함되던 버그 발견·재등록
12. **머지 전 이중 검증** — 브랜치(`cloudflare-migration-prep`) push → Vercel 프리뷰 배포 성공 확인(사용자 육안 확인) → main으로 ff-merge & push → 프로덕션 Vercel 재배포도 정상 확인 후 브랜치 정리
13. **실제 DNS 이전 실행** — Cloudflare Workers 커스텀 도메인은 Pages와 달리 zone 전체가 Cloudflare 네임서버여야 함을 확인 → 기존 레코드 조사(등록기관이 애초 추정한 お名前.com이 아니라 **무무도메인**임을 사용자가 직접 확인) → Cloudflare "도메인 연결"에서 DNS 자동 스캔 시 `trip.lalalakorea.com` CNAME이 누락됨을 발견해 수동 추가(DNS 전용) → 무무도메인에서 네임서버를 Cloudflare(`bjorn`/`kristina`)로 변경 → Active 전환(예상보다 빠르게 완료) → Worker 커스텀 도메인 추가 시 기존 apex A레코드 충돌 에러 → 충돌 레코드 2개만 정확히 삭제 후 재시도로 연결 성공
14. **최종 검증 + 안전성 설명** — `lalalakorea.com`·`trip.lalalakorea.com` 둘 다 200, SSL(Let's Encrypt) 정상 확인. Vercel을 그대로 둬도 canonical 태그 때문에 중복 콘텐츠 문제 없음을 설명, 오히려 즉시 롤백 안전망으로 당분간 유지하기로 결정
15. **Cloudflare 이전이 안드로이드 앱(RN/Expo) 계획에 미치는 영향 검토** — 오늘 fs→JSON 리팩터링 덕분에 앱용 API를 나중에 추가할 때 Cloudflare에서도 안전하게 동작할 것으로 확인(예전 fs 기반이었다면 앱 API 라우트 추가 시 동일하게 크래시 났을 것). 다만 코스/레슨 데이터를 앱이 fetch할 수 있는 JSON API 엔드포인트는 아직 없음(미착수). Cloudflare Workers 무료 플랜은 공식 문서상 Vercel Hobby와 달리 "비상업적 사용 전용" 제약이 없음을 확인(광고/결제 앱 확장에 유리)

### 완료된 항목

- [x] `oshi-katsu-vocabulary` 게시글 오류 수정 + 썸네일·학습링크 추가
- [x] `korean-learning-apps-2026` 팩트체크 3건 반영
- [x] 57MB `wp-statistics` 미사용 파일 제거 (git 추적 해제 + 로컬 파일 삭제)
- [x] 홈·카테고리 페이지네이션을 `/page/N` 정적 라우트로 전환 (구 URL 308 리디렉션)
- [x] `@opennextjs/cloudflare@1.15.1`(Next 14 호환) + `wrangler` 설치, `wrangler.jsonc`/`open-next.config.ts` 구성
- [x] `lib/posts.js`·`lib/courses.js`·`lib/wordpacks.js` 런타임 fs 의존성 완전 제거 (빌드 시점 JSON 생성 방식으로 전환)
- [x] OpenNext Cloudflare "page" 라우팅 충돌 버그 발견·해결 (`?page=` 리디렉션 제거)
- [x] WSL 경유 Cloudflare 빌드 파이프라인 확립 (Windows 네이티브 빌드 크래시 우회)
- [x] Cloudflare Workers 실배포 (`lalalakorea.hanamanajun.workers.dev`) + 전체 라우트 검증
- [x] Cloudflare Worker 시크릿 5종 등록 (따옴표 버그 수정 포함)
- [x] Vercel 프리뷰 배포로 사전 검증 후 main 머지·push (프로덕션 무중단 확인)
- [x] **실제 도메인 이전 완료** — 네임서버를 무무도메인 → Cloudflare로 전환, `lalalakorea.com`을 Worker 커스텀 도메인으로 연결
- [x] `trip.lalalakorea.com` 무영향 확인 (CNAME 수동 보존), TXT(서치콘솔 인증) 레코드 보존 확인
- [x] SSL 인증서 정상 발급 확인, 중복 콘텐츠 SEO 리스크 없음을 canonical 태그 근거로 설명
- [x] Vercel 배포는 롤백 안전망으로 당분간 유지하기로 결정 (코드 작업 아님, 방침 결정)
- [x] Cloudflare 이전이 안드로이드 앱(RN/Expo) 계획을 방해하지 않음을 확인 (오히려 데이터 접근이 쉬워짐), Cloudflare 무료 플랜에 Vercel 같은 비상업적 사용 제약 없음을 공식 문서로 확인

### 다음에 할 일

- [ ] **Vercel 프로젝트(lalalakorea) 삭제 검토** — 2주 정도 Cloudflare 안정성 지켜본 뒤, 문제없으면 Vercel 쪽 lalalakorea 프로젝트 정지/삭제 (목표 시점: 2026-08-23 전후)
- [ ] **trip.lalalakorea.com 이전** — 별도 코드베이스라 오늘과 동일한 사전 검증(런타임 fs 의존성 등 확인) 필요. DNS 존은 이미 Cloudflare에 있으므로 네임서버 재변경 없이 Worker 커스텀 도메인 추가만으로 가능
- [ ] **서치콘솔 모니터링** — 도메인 이전 후 1~2주간 크롤 오류·색인 상태 이상 없는지 확인 (TXT 인증은 유지됐으나 호스팅 변경 자체는 처음이라 한 번은 눈으로 확인 권장)
- [ ] **AdSense 정상 노출 확인** — 새 호스팅(Cloudflare)에서도 광고가 정상적으로 게재되는지 확인
- [ ] **(선택) `www.lalalakorea.com`도 Cloudflare Worker 커스텀 도메인으로 추가** — 현재는 Vercel에 남아있고 앱 자체 리디렉션으로 apex까지는 정상 도달하나, 완전히 일원화하려면 www도 추가 가능
- [ ] **(선택) Vercel Pro 플랜 전환** — AdSense가 이미 붙어있어 Hobby 플랜 약관(비상업적 사용 전용) 위반 상태. Vercel을 계속 유지하기로 한 만큼 언젠가 처리 필요 (단, lalalakorea 자체를 곧 Cloudflare 전용으로 정리할 계획이면 우선순위 낮음)

### 안드로이드 앱(RN/Expo) 계획 — 아직 착수 전, 방향만 논의됨
- [ ] **앱용 JSON API 엔드포인트 신설** — 코스/레슨/단어팩 데이터를 앱이 fetch할 수 있도록 `app/api/courses/route.js` 등 신설 (기반이 되는 `lib/courses.js` 등은 오늘 이미 fs-free로 정리 완료라 안전하게 추가 가능)
- [ ] API 라우트 추가 시 CORS 헤더 설정 (앱에서의 요청 허용)
- [ ] API 라우트 추가 시 Cloudflare 봇 방지(Security) 설정이 앱 요청을 오탐지로 막지 않는지 확인
- [ ] RN/Expo 프로젝트 뼈대 세팅 자체는 미착수 — 다음 세션에서 실제 착수 여부 결정

---

*最終更新: 2026-07-31*
