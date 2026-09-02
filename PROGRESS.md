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

## 2026-08-17 の作業内容 — 조사 시리즈 학습 코스 3종 신설 + CMS 버그 수정 + Supabase 점검

### 오늘 한 일

1. **`korean-subject-particles` 죽은 링크 삭제** — 본문 마지막 참고링크였던 「韓国観光公社 公式サイト」가 잘못된 링크라 삭제 (`d5d906c`)
2. **`/learn/location-particles` 학습 코스 신설** — `korean-location-particles` 글(에/에서 장소 조사) 기반, 예문+퀴즈 전 5레슨(기본룰·존재/에·동작출발점/에서·오다가다 함정·종합퀴즈) 제작, 원문 글에 코스 링크 추가 (`8cc4f1d`)
3. **`/learn/korean-numbers` 학습 코스 신설** — `korean-numbers-guide` 글(고유어·한자어 숫자) 기반, 예문+퀴즈 전 6레슨(개요·고유어·한자어·장면별 사용구분·세는말 변화형·종합퀴즈) 제작, 원문 글에 코스 링크 추가 (`78ae8ad`)
4. **`/learn/subject-particles` 학습 코스 신설** — `korean-subject-particles` 글(은/는·이/가 주어 조사) 기반, 예문+퀴즈 전 6레슨(기본룰·형태변화·좋아요 함정·누가+있다·은는이가 이중구조·종합퀴즈) 제작, 원문 글에 코스 링크 추가 (`c079ab6`)
5. **배포가 자동이 아님을 재확인 + 실제 배포 3회 수행** — GitHub push만으로는 Cloudflare에 반영 안 됨(CI/CD 파이프라인 부재)을 사용자가 재차 질문해서 재확인, 매번 WSL(`~/lalalakorea-cf-build`)로 최신 코드 rsync 동기화 → `npm run cf:deploy` 빌드·배포 → curl로 라이브 검증까지 3세트 모두 수행
6. **Cloudflare wrangler 인증 만료 대응** — 첫 배포 시도에서 OAuth 토큰 만료로 실패(`Not logged in... environment is non-interactive`) → 사용자가 직접 터미널에서 `wrangler login` 재인증 → 배포 재개
7. **Decap CMS "collections names must be unique" 오류 진단·수정** — `public/admin/index.html`의 인라인 `CMS.init({config})`와 `public/admin/config.yml`이 둘 다 `posts` 컬렉션을 정의하고 있고, Decap이 기본값으로 `config.yml`까지 추가로 불러와 병합하면서 컬렉션이 중복 등록되는 게 원인임을 특정 → 인라인 config에 `load_config_file: false` 추가로 자동 로드 차단 (`1d941bc`)
8. **위 수정의 회귀를 자동 보안 리뷰로 발견·수정** — `load_config_file: false`로 `config.yml` 로드를 막으면서 그 안에 있던 `publish_mode: editorial_workflow`도 함께 유실 → CMS 저장이 바로 main에 커밋되는 simple 모드로 바뀌는 회귀였음. 인라인 config에 `publish_mode: 'editorial_workflow'`를 명시해 복원 (`6d8df01`)
9. **CMS 초안(draft)으로 남아있던 썸네일 2건 발견·배포** — 사용자가 "썸네일 올렸어"라고 했으나 main엔 반영 안 됨 → `editorial_workflow` 모드라 `cms/posts/2026-08-14-korean-numbers-guide`·`cms/posts/2026-08-17-korean-subject-particles` 브랜치에 초안으로만 저장(“Publish” 미클릭)되어 있던 것을 확인 → 두 브랜치 모두 main에 머지, 원격 브랜치 정리, 배포까지 완료 (`141408c`)
10. **Supabase Security Advisor 경고 3건 점검** — `public.rls_auto_enable()` SECURITY DEFINER 함수의 public/authenticated 실행권한 경고 2건(코드베이스 어디서도 호출 안 함을 grep으로 확인, 수정 SQL 제시)과 leaked password protection 비활성화 경고 1건(Free 플랜에선 토글 자체가 비활성화되어 있어 Pro 플랜 필요함을 확인) 원인 분석·설명 — **사용자가 현재는 그대로 두기로 결정, 코드/설정 변경 없음**

### 완료된 항목

- [x] `korean-subject-particles` 잘못된 참고링크(韓国観光公社) 삭제
- [x] `/learn/location-particles` 코스 신설 (전 5레슨) + 원문 글 코스 링크 추가
- [x] `/learn/korean-numbers` 코스 신설 (전 6레슨) + 원문 글 코스 링크 추가
- [x] `/learn/subject-particles` 코스 신설 (전 6레슨) + 원문 글 코스 링크 추가
- [x] 학습 코스 3건 모두 로컬 dev 서버로 전 레슨 200 확인 후 커밋
- [x] 학습 코스 3건 모두 WSL 경유 Cloudflare 실배포 + 라이브 URL curl 검증 완료
- [x] Cloudflare wrangler 인증 만료 → 재로그인 후 배포 재개
- [x] Decap CMS 컬렉션 중복 등록("collections names must be unique") 버그 원인 특정·수정
- [x] 위 수정으로 인한 `editorial_workflow` 유실 회귀를 자동 보안 리뷰로 발견·즉시 수정
- [x] CMS 초안 상태로 미발행돼 있던 썸네일 2건(numbers-guide, subject-particles) 발견 → main 머지·배포
- [x] Supabase Security Advisor 경고 3건 원인 분석 및 조치 방안 안내 (사용자 판단으로 보류)

### 다음에 할 일

- [ ] **CI/CD 자동배포 파이프라인 구축 검토** — 현재 GitHub push와 실제 Cloudflare 배포가 분리돼 있어 "왜 반영이 안 되냐"는 혼란이 반복됨. GitHub Actions로 main push 시 자동 WSL/Linux 빌드·`wrangler deploy`까지 이어지는 워크플로 구성 검토
- [ ] **Supabase `rls_auto_enable()` 함수 실행권한 정리** — `revoke execute on function public.rls_auto_enable() from public, authenticated, anon;` (사용자가 보류 결정, 필요시 재논의)
- [ ] **Supabase 최소 비밀번호 길이 6→8 상향** — 무료로 가능한 부분 보완책, 보류 중
- [ ] **Leaked password protection 재검토 시점** — 현재 Free 플랜이라 불가, 결제 기능 등 실제 수익화로 계정 가치가 올라가는 시점에 Pro 플랜 전환과 함께 재검토
- [ ] **조사 시리즈 다음 편** — `korean-subject-particles` 글 말미에 예고된 "敬語とパンマルの切り替え" 글 + 대응 학습 코스
- [ ] 이전 세션(08-08/09)에서 보류된 항목 이월 — Vercel 프로젝트 정리, `trip.lalalakorea.com` 이전, 서치콘솔 모니터링, AdSense 노출 확인 등 (상세는 위 섹션 참고)

---

## 2026-08-19/20 の作業内容 — 済州秋旅行記事 신설 + 팩트 수정 + 済州島단어팩 신설 + Vercel 자동배포 차단 + CMS 썸네일 PR 반영

### 오늘 한 일

1. **`jeju-autumn-travel-guide` 신규 글 작성·공개** — 산굼부리·한라산·みかん狩り·牛島·비자림·東門市場·카멜리아힐 7선 구성 (`87864e2`)
2. **위 글 팩트 수정 2건** — 산굼부리 화산 연대·희귀성 표현("약 10만년 전/유일한 타입" → "약 7만3천년 전/드문 타입"), 비자림 소재지("朝天邑" → "旧左邑") 수정 (`4d297a7`)
3. **`済州島旅行ワード` 단어팩 신설** — `/learn/packs`에 렌트카·흑돼지·감귤·한라산·우도·해녀·올레길·성산일출봉·협재·돌하르방 등 제주 특화 단어 10개 추가 (`d2cad9b`), `content/wordpacks/*.json` → 빌드 시 `lib/wordpacks-data.generated.json` 생성 구조 확인
4. **WSL 경유 Cloudflare 실배포 2회** — 위 2·3번 반영분, 이후 CMS 썸네일 반영분까지 매번 `~/lalalakorea-cf-build` rsync 동기화 → `npm run cf:deploy` → curl 라이브 검증
5. **Vercel이 push마다 몰래 자동 재배포되고 있던 것을 발견·차단** — 사용자가 "Vercel도 업데이트했냐"고 질문해서 확인해보니 Vercel 프로젝트의 GitHub 연동이 살아있어 매 push마다 Vercel Production도 같이 재배포되고 있었음(Cloudflare 이전 사유였던 Hobby 플랜 상업적 사용 ToS 리스크가 계속 재발 중이었던 셈) → `vercel git disconnect`로 연동 차단. 프로젝트 자체는 롤백 안전망으로 유지
6. **Decap CMS editorial_workflow PR 발견·반영** — 사용자가 제주 글에 썸네일을 업로드했다고 알려와 GitHub 확인 → `cms/posts/2026-08-19-jeju-autumn-travel-guide` 브랜치의 PR #3(썸네일 `jeju_autumn_thumbnail_web.webp` + frontmatter)을 main에 머지 → pull → WSL 재동기화 → Cloudflare 재배포 → `og:image` 태그로 라이브 반영 확인

### 완료된 항목

- [x] `jeju-autumn-travel-guide` 글 신규 작성·공개, 팩트 오류 2건 수정
- [x] `/learn/packs`에 `jeju-travel` 단어팩(전 10어) 신설
- [x] WSL 경유 Cloudflare 실배포 2세트 + curl 라이브 검증
- [x] Vercel GitHub 연동이 push마다 자동 재배포하고 있던 문제 발견 → `vercel git disconnect`로 차단 (프로젝트는 롤백용으로 유지)
- [x] CMS 초안 상태로 남아있던 제주 글 썸네일 PR(#3) 발견 → 머지·배포·라이브 검증 완료

### 다음에 할 일

- [ ] **CI/CD 자동배포 파이프라인 구축 검토** — GitHub push와 실제 Cloudflare 배포가 여전히 분리돼 있음 (이월, [[project_lalalakorea_cloudflare_migration]] 참고)
- [ ] **Vercel 프로젝트 완전 삭제 여부 재검토** — GitHub 연동은 끊었으니 급한 리스크는 아니지만, 롤백 안전망이 더 이상 필요 없다고 판단되면 프로젝트 자체 삭제 검토
- [ ] **CMS editorial_workflow PR 처리 습관화** — 앞으로도 CMS에서 저장한 초안은 PR로만 쌓이고 자동 머지되지 않으므로, 저장 후 "반영해줘"라고 알려주면 PR 확인→머지→배포까지 처리
- [ ] 이전 세션(08-17)에서 보류된 항목 이월 — Supabase 권한 정리, 조사 시리즈 다음 편("敬語とパンマルの切り替え"), 안드로이드 앱 계획 등 (상세는 위 섹션 참고)

---

## 2026-08-21 の作業内容 — 신조어 기사 신설·팩트수정 + 단어팩 신설 + RESCENE 내부링크 + CMS 초안 재발견

### 오늘 한 일

1. **`korean-neologisms-2026` 신규 글 작성·공개** — 2026年韓国語の新造語・若者言葉10選(아자스·야르·밤티·샤갈·난리자베스·갓생·폼미쳤다·중꺾마·킹받는다·잼민이) (`2e7837d`)
2. **위 글 팩트/표현 수정 2건** — 중꺾마·갓생·폼미쳤다 유행 연도 정정, 잼민이=초등학생 지칭 정정, 익명 인용 완화, RESCENE 오이데/맛떼루요 언급 추가, 잼얘→킹받는다 교체 (`f3aa08f`, `19cdd24`)
3. **CMS editorial_workflow 초안 브랜치 재발견·머지** — 사용자가 CMS에서 썸네일을 올렸다고 알려왔으나 main엔 반영 안 됨 → `cms/posts/2026-08-21-korean-neologisms-2026` 브랜치에 썸네일(`korean-neologisms-2026-thumbnail.webp`) + 밤티 섹션 관련 스크린샷(`178730719717.jpg`) + frontmatter 정리분이 초안(미발행)으로 남아있던 것을 확인 → main에 fast-forward 머지 (`908349b`)
4. **`korean-neologisms-2026` 단어팩 신설** — `/learn/packs`에 아자스·야르·밤티·샤갈·난리자베스·갓생·폼미쳤다·중꺾마·킹받는다·잼민이 10어 추가, 원문 글 하단 참고링크에 연결 (`e2af411`)
5. **RESCENE 문단에 내부링크 추가** — 오이데/맛떼루요 언급 문단 바로 아래에 `rescene-geoje-yaho-miracle`(RESCENE 전체 기록 기사) 링크 삽입 (같은 커밋 `e2af411`)
6. **배포 누락 재발생 → WSL 경유 재배포로 해결** — GitHub push까지만 하고 실제 Cloudflare 배포를 빠뜨려 "썸네일도 단어팩도 반영 안 됨" 피드백을 받음 → `~/lalalakorea-cf-build` rsync 동기화 → `npm run cf:deploy` → curl로 `og:image`·`/learn/packs/korean-neologisms-2026`(200)·본문 내 두 링크(rescene, wordpack) 모두 라이브 반영 확인

### 완료된 항목

- [x] `korean-neologisms-2026` 신규 글 작성·공개, 팩트 수정 2건
- [x] CMS 초안으로 남아있던 썸네일+이미지 커밋 발견 → main 머지
- [x] `/learn/packs/korean-neologisms-2026` 단어팩(전 10어) 신설 + 원문 글에 링크 연결
- [x] RESCENE 관련 문단에 `rescene-geoje-yaho-miracle` 내부링크 추가
- [x] WSL 경유 Cloudflare 실배포 + curl 라이브 검증 (썸네일 og:image·단어팩 200·본문 링크 2건 모두 확인)

### 다음에 할 일

- [ ] **CI/CD 자동배포 파이프라인 구축 검토** — 오늘도 "push했는데 왜 반영 안 되냐" 문제가 재발함. GitHub push 시 자동으로 WSL/Linux 빌드 + `wrangler deploy`까지 이어지는 워크플로 구성이 계속 이월 중 ([[project_lalalakorea_cloudflare_migration]] 참고)
- [ ] **CMS 초안(`cms/posts/*`) 브랜치 정리** — `cms/posts/2026-08-21-korean-neologisms-2026`는 머지 완료돼 원격에서 삭제해도 안전, `cms/posts/2026-08-19-jeju-autumn-travel-guide`도 상태 확인 후 정리 필요
- [ ] 이전 세션(08-19/20)에서 보류된 항목 이월 — Vercel 프로젝트 삭제 여부, Supabase 권한 정리, 조사 시리즈 다음 편("敬語とパンマルの切り替え"), 안드로이드 앱 계획 등

---

## 2026-08-25 の作業内容 — 敬語・パンマル記事+학습코스 신설 + /learn UX 전면 개편 + 모바일 내비게이션 재설계

### 배경
전날 발행된 `korean-polite-switching`(敬語・パンマル切り替え, 시리즈 3편) 글에 썸네일 반영과 학습 코스 연동을 요청받은 것을 시작으로, `/learn` 섹션 전반의 UX 문제(사이드바 중복·배지 줄바꿈)와 모바일 내비게이션(사이트 헤더·/learn 메뉴) 개선까지 하루 동안 이어서 진행.

### 오늘 한 일

1. **`korean-polite-switching` 글 마무리** — CMS에서 저장된 썸네일 초안 브랜치(`cms/posts/2026-08-25-korean-polite-switching`)가 main에 반영 안 돼 있던 것을 발견·머지 (`4052e77`)
2. **`/learn/polite-switching` 학습 코스 신설** — 존댓말/반말 2단계 개념 → 전환 표현(말을 놓다 등) → 나이·관계별 타이밍 규칙 → 해요체→해체 변환 → 드라마 대사·실수 3가지 → 총정리 퀴즈, 전 6레슨 제작 + 원문 글 하단(본문 내 링크 + 참고링크 목록 2곳)에 코스 링크 연결 (`80202cd`)
3. **`git push` ≠ 배포 재확인** — 위 작업 완료 후 push만 하고 배포로 착각해 "사이트에 반영이 안 된다"는 피드백을 다시 받음 → WSL rsync + `cf:deploy`로 마무리, 메모리(`project_lalalakorea_cloudflare_migration.md`)에 재발 사례로 기록해 이후부터는 push 승인 시 배포까지 한 세트로 진행하도록 정리
4. **`/learn` 사이드바·톱페이지 UX 개편** — 사용자가 스크린샷으로 지적한 "韓国語を学ぼう"/"学習トップ" 중복, "学習ノート"가 트리 들여쓰기로 하위 항목처럼 보이던 문제를 발견해 수정. 学習ノート → **マイノート**로 개명(사이드바·통계 위젯·페이지 제목/breadcrumb·로그인 문구까지 일괄 반영), 톱페이지 레슨·단어팩 카드를 각 6개로 제한하고 초과분은 "もっと見る" 카드로 유도 (`7a12ec0`)
5. **UX 개선 아이디어 3건 제안 → 전부 승인받아 구현**: ① `ContinueLearning.js` — 로그인 사용자의 미완료 코스를 감지해 톱페이지 상단에 "続きから学習" 카드로 노출 ② 사이드바에 레슨 진행률·단어복습 대기수 배지 추가 ③ 전 8개 코스 `course.json`에 `category`(basic/grammar/vocab) 필드 부여 + `/learn/lessons`에 URL 쿼리 기반 필터 탭 신설 (`80946a4`)
6. **사이드바 배지가 라벨과 함께 줄바꿈되는 버그 발견·수정** — "ハングルレッスン"처럼 긴 라벨 옆에 배지가 가로로 붙다 보니 사이드바 폭을 넘어 두 줄로 밀리던 것을 원인 진단, 배지를 라벨 옆이 아니라 **아이콘 우측 상단 점(알림 뱃지 패턴)**으로 재설계해 가로 공간을 전혀 안 쓰도록 수정 (`9799e77`)
7. **모바일 내비게이션 개선안 Artifact 제작·2차 확장** — 로그인 버튼·검색 아이콘·햄버거가 한 줄에 몰려있던 사이트 헤더 문제를 실사이트 스타일로 재현한 비교 목업(before/after, 실제 동작하는 드로어) 제작 → 승인 후, 같은 Artifact에 `/learn` 모바일 메뉴(가로 스크롤 바 → 하단 고정 탭바) 비교 섹션 추가
8. **사이트 헤더 모바일 재설계 실제 반영** — `MobileMenu.js` 재작성: 로그인/검색을 상단 바에서 빼서 드로어 안으로(검색창+로그인 알약), 学習을 레드 그라데이션 CTA 카드로, 카테고리 6종을 2열 아이콘 그리드로 재배치, 로고=홈이므로 중복이던 "ホーム" 링크 제거. 데스크톱 헤더는 영향 없도록 `.site-header .auth-nav-btn`/`.search-btn`만 모바일 폭에서 CSS로 숨김 처리 (`9799e77`)
9. **`/learn` 모바일 메뉴를 하단 고정 탭바로 전환 실제 반영** — 900px 이하에서 사이트 헤더+학습 바 2단 적재로 화면 상단이 잠식되고 4개 메뉴가 가로 스크롤로 잘리던 문제를, `LearnNav.js`에서 마이노트/한글레슨/단어복습/단어팩 4개짜리 `position:fixed` 하단 탭바로 교체해 해결. 브랜드 알약·"ブログにもどる"는 로고·breadcrumb과 중복이라 모바일에서 제거, 코스/노트 페이지의 코랄톤·핑크톤 팔레트에도 탭바 색상 맞춤 (`3d5cd8d`)
10. **Artifact 파일 인코딩 사고 발견·즉시 복구** — PowerShell `Get-Content`/`Set-Content`로 텍스트 치환을 시도하다 한글/일본어가 mojibake로 깨짐 → 되돌리는 대신 올바른 내용으로 파일 전체를 Write로 재작성해 복구 (다음부터 CJK 포함 파일은 PowerShell 텍스트 치환 대신 Edit/Write 도구 사용할 것)
11. **매 커밋마다 로컬 `npm run build` + curl/컴파일된 JS번들 검증 → WSL 경유 `cf:deploy` → 라이브 curl 검증**을 4세트 반복 수행 (사이드바+톱페이지, 3기능 추가, 배지+헤더, 하단탭바 각각 별도 배포)

### 완료된 항목

- [x] `korean-polite-switching` CMS 썸네일 초안 브랜치 발견·머지
- [x] `/learn/polite-switching` 학습 코스 신설(전 6레슨) + 원문 글에 코스 링크 2곳 연결
- [x] `/learn` 사이드바 "韓国語を学ぼう"/"学習トップ" 중복 제거, "学習ノート" → "マイノート" 개명·독립 항목화 (전 화면 일괄 반영)
- [x] `/learn` 톱페이지 레슨·단어팩 카드 6개 제한 + "もっと見る" 카드
- [x] "続きから学習"(ContinueLearning) 카드 신설
- [x] 사이드바 진행률·복습 대기 배지 신설 → 줄바꿈 버그 발견해 아이콘 코너 점 방식으로 재설계
- [x] 전 8개 코스에 `category` 필드 부여 + `/learn/lessons` 카테고리 필터 탭(基礎/文法/表現・単語) 신설
- [x] 모바일 내비게이션 비교 Artifact 제작(사이트 헤더 + /learn 메뉴 2섹션)
- [x] 사이트 헤더 모바일 재설계 실제 반영 — 로그인·검색 드로어 이동, 学習 CTA 카드, 카테고리 그리드, "ホーム" 중복 제거
- [x] `/learn` 모바일 메뉴를 하단 고정 탭바로 전환 실제 반영
- [x] Artifact 파일 인코딩 사고(PowerShell mojibake) 즉시 복구
- [x] 오늘 변경사항 전 4세트 로컬 빌드 검증 + WSL 경유 Cloudflare 실배포 + 라이브 curl 검증
- [x] "git push ≠ 배포" 재발 사례를 메모리에 기록해 재발 방지 조치

### 다음에 할 일

- [ ] **실제 모바일 기기/브라우저 육안 확인** — 오늘 배포한 사이트 헤더 드로어·`/learn` 하단 탭바는 스크린샷 도구가 없어 코드/빌드 레벨(curl, 컴파일된 JS 번들)로만 검증함. 실기기에서 한 번 확인 권장
- [ ] **CI/CD 자동배포 파이프라인 구축 검토** — 오늘도 push를 배포로 착각해 반영 누락이 재발함. GitHub push 시 자동으로 WSL/Linux 빌드 + `wrangler deploy`까지 이어지는 워크플로 구성이 계속 이월 중 ([[project_lalalakorea_cloudflare_migration]] 참고)
- [ ] **CMS 초안(`cms/posts/*`) 브랜치 정리** — `cms/posts/2026-08-25-korean-polite-switching`는 머지 완료돼 원격에서 삭제해도 안전
- [ ] **조사 시리즈 4편 준비** — `korean-polite-switching` 글 말미에 예고된 "発音ルール（連音・濃音化）" 글 + 대응 학습 코스
- [ ] 이전 세션(08-21)에서 보류된 항목 이월 — Vercel 프로젝트 삭제 여부, Supabase 권한 정리, 안드로이드 앱 계획 등

---

## 2026-08-28 / 29 の作業内容 — 全記事404障害 복구 + 배포 파이프라인 정비 + kdrama-anger-aegyo 학습코스 신설 + /learn 카드 UX 개선

### 배경
"블로그 글 클릭하면 404 뜬다"는 보고로 시작. 원인 조사 결과 전날 커밋(`d669eb2`, WordPress 스캐너 대응)이 잠복해 있던 캐시 미설정 문제를 표면화시킨 것으로 확인 — 단순 되돌리기가 아니라 근본 원인(OpenNext incrementalCache 미설정)까지 함께 고쳐야 했던 하루. 이후 배포 실행 권한 자체가 auto mode에 막히는 것을 계기로 배포 스크립트를 저장소로 옮기고 좁은 권한 규칙을 추가, 이어서 신규 글 학습코스 제작과 `/learn` 카드 UX 개선까지 이어감.

### 오늘 한 일

1. **전체 블로그 글 404 원인 진단** — `d669eb2`가 7개 라우트(글·카테고리·페이지네이션·학습 코스/레슨/단어팩)에 넣은 `dynamicParams = false`가 prerender manifest의 `fallback:false`로 이어지고, `open-next.config.ts`에 `incrementalCache`가 없어 캐시가 no-op이던 것과 맞물려 즉시 404로 귀결된 것을 Next 소스(`base-server.js:1551`)까지 추적해 확인. 라이브 `x-nextjs-cache: MISS` 헤더로 "그동안 전 요청이 매번 풀 SSR로 렌더링되고 있었다"는 사실도 함께 발견 — 이게 WordPress 스캐너 대응이 필요했던 CPU 초과의 진짜 원인
2. **3중 수정**: ① `dynamicParams=false` 7건 전부 제거(장애 이전 상태와 바이트 단위로 동일함을 diff로 확인) ② `open-next.config.ts`에 `staticAssetsIncrementalCache` 설정 — 캐시가 비어도 SSR 폴백으로 200이 나오게 하면서 CPU 초과의 근본 원인도 해소 ③ 스캐너 차단(`/wp-login.php` 등)을 라우팅 이전 `middleware.js`로 이전, SSG를 깨지 않으면서 방어 유지. 작업 중 `public/wp-content/uploads/`(61개 글이 참조하는 레거시 이미지 5,928개)를 차단 규칙이 덮칠 뻔한 것을 사전에 발견해 예외 처리 (`555d8de`)
3. **배포 후 라이브 검증 스모크 테스트 스크립트 신설** — 로컬 빌드가 성공해도 Cloudflare 런타임에서만 드러나는 장애(이번 건)를 배포 직후 자동으로 잡기 위해 `scripts/smoke-test.mjs` 작성. 캐시 적중(`x-nextjs-cache: HIT`) 여부까지 200 판정에 포함시켜, "200은 나오는데 사실 전부 SSR" 상태를 실패로 잡아내도록 설계. 일부러 잘못된 URL을 물려 실패 검출도 검증 (`3f5c7ed`)
4. **위 수정사항 WSL 경유 실배포 + 전수 라이브 검증** — 이번엔 Bash 권한 자체가 auto mode 분류기에 막혀 사용자가 직접 배포 명령을 실행, 이후 결과를 curl로 전수 검증(글·카테고리·페이지네이션·학습 코스 전부 200 + `x-nextjs-cache: HIT`, 스캐너 경로 403/404, 레거시 이미지 200)
5. **CMS 초안 브랜치 2건 발견·머지** — `kdrama-anger-aegyo-phrases`(신규 글) 썸네일과 `2026h2-kdrama-lineup`(기존 글) 썸네일 교체가 Decap CMS 초안 브랜치로만 남아있던 것을 `git branch -r`로 발견해 각각 머지 (`f9d7de7`, `dcd90c3`). 오래돼 main보다 뒤처진 초안 브랜치 4건은 머지하면 최신 코드가 되돌아가므로 손대지 않고 보류
6. **학습 코스 `kdrama-anger-aegyo` 신설(전 6과)** — `kdrama-anger-aegyo-phrases` 글(怒り・甘えフレーズ12選)을 기반으로 기존 코스와 동일한 구성(きなこ・ジュン 대화 → 어휘표 → 예문 → 실전 미니회화 → 豆知識)으로 제작. 01~04과는 12프레이즈를 怒り/甘え 각 6개씩 3개씩 배치 + 보너스 단어 4개, 05과는 글의 마무리 3줄("怒りは短く強く" 등)을 어조 대비 회화로 확장한 독립 레슨, 06과는 8문항 수료 퀴즈. 원문 글에도 まとめ 직후 CTA + 関連記事 목록 2곳에 코스 링크 연결, 앵커 텍스트 없이 깨져 있던 빈 링크(`[](...)`)도 함께 수정 (`7414408`)
7. **배포 스크립트를 저장소로 이관 + 권한 정비** — 그때그때 재작성되던 `c:\tmp` 임시 스크립트를 `scripts/deploy-cloudflare.sh`(rsync → cf:deploy → smoke 자동 실행, `--dry-run` 지원)로 정착. `.claude/settings.json`에 이 스크립트 실행 **한 줄만** 허용하는 권한 규칙 추가(와일드카드 아님) — 사용자가 "허용하되 매번 확인"을 선택해, 이후 배포는 Claude가 준비하되 실행 직전엔 항상 승인받는 방식으로 합의 (`574b912`)
8. **레슨·단어팩 정렬을 최근 추가순으로 변경** — 수동 `order` 필드는 새 코스를 만들 때마다 기존 값을 다시 매겨야 해 최신 코스가 톱페이지 6개 안에 든다는 보장이 없었음. `order` → `date` 필드로 교체(값은 git 최초 커밋일로 백필), 생성 스크립트 정렬 기준을 `order` 오름차순에서 `date` 내림차순으로 변경 (`fb13de2`)
9. **레슨·단어팩 목록 카드에서 설명 문단 제거** — "제목 밑에 긴 설명이 있으면 읽다가 고민하게 돼서 오히려 클릭률이 떨어진다"는 지적에 따라 `/learn`·`/learn/lessons`·`/learn/packs` 세 목록 화면 카드에서 설명 문단 제거(상세 페이지엔 그대로 존재 확인). 사용 안 하는 CSS(`.premium-card-desc`) 삭제, 여러 줄 제목에서도 카드 하단이 정렬되도록 `flex:1`을 타이틀로 이동 (`f2078e1`)
10. **위 6~9번 변경사항 재배포 + 전수 라이브 검증** — 이번엔 승인받은 배포 스크립트로 Claude가 직접 배포(스모크 테스트 자동 포함, 전부 통과). 신규 코스 8개 라우트 200/HIT, 썸네일 2건 OG 메타 반영, `/learn` 첫 6개 카드에 신규 코스가 최상단에 노출되는 것까지 curl로 확인

### 완료된 항목

- [x] 전체 블로그 글 404 장애 원인 진단(`dynamicParams=false` + `incrementalCache` 미설정의 조합) 및 3중 수정
- [x] `staticAssetsIncrementalCache` 설정으로 CPU 초과 근본 원인(전 요청 SSR) 해소 — 라이브 `x-nextjs-cache: HIT` 확인
- [x] 스캐너 차단을 middleware로 이전, `wp-content/uploads` 레거시 이미지 5,928개 예외 처리
- [x] 배포 후 라이브 검증용 `scripts/smoke-test.mjs` 신설(캐시 적중까지 판정에 포함)
- [x] CMS 썸네일 초안 2건(`kdrama-anger-aegyo-phrases`, `2026h2-kdrama-lineup`) 발견·머지
- [x] `/learn/kdrama-anger-aegyo` 학습 코스 신설(전 6과, 단어 20·퀴즈 28) + 원문 글에 코스 링크 2곳 연결 + 빈 링크 수정
- [x] 배포 스크립트를 `scripts/deploy-cloudflare.sh`로 저장소 이관 + `.claude/settings.json`에 좁은 권한 규칙 추가
- [x] 레슨·단어팩 정렬을 수동 `order` → `date` 기반 최근순으로 변경
- [x] `/learn`·`/learn/lessons`·`/learn/packs` 목록 카드에서 설명 문단 제거(상세 페이지는 유지)
- [x] 위 모든 변경사항 WSL 경유 Cloudflare 실배포 2회 + 매회 스모크 테스트/curl 전수 검증

### 다음에 할 일

- [ ] **CMS 초안 브랜치 4건 정리 여부 확인** — `jeju-autumn-travel-guide`·`korean-neologisms-2026`·`korean-polite-switching`·`korean-pronunciation-rules` 초안이 main보다 뒤처진 상태로 원격에 남아있음. Decap 화면에서 걸리적거리면 삭제 필요
- [ ] **신규 코스 `/learn` 노출 방식 재검토** — 현재 `COURSE_LIMIT=6` 그대로라 코스가 7개 넘어가면 다시 "もっと見る" 뒤로 밀림. limit 상향 여부는 코스 수가 더 늘었을 때 판단
- [ ] **실기기 브라우저에서 새 코스·카드 UX 육안 확인** — 이번 세션은 curl/컴파일된 HTML 레벨로만 검증함(스크린샷 도구 없음)
- [ ] **CI/CD 자동배포 파이프라인 구축 검토** — 이번에도 배포 실행 자체가 권한에 막혀 사용자가 처음엔 직접 명령을 쳐야 했음. `scripts/deploy-cloudflare.sh` + 권한 규칙으로 완화했지만, GitHub push 시 자동 배포까지 이어지는 워크플로는 여전히 미착수 ([[project_lalalakorea_cloudflare_migration]] 참고)
- [ ] 이전 세션에서 보류된 항목 이월 — Vercel 프로젝트 삭제 여부, Supabase 권한 정리, 안드로이드 앱 계획 등

---

---

## 2026-08-30 の作業内容 — 애드센스 광고 노출 붕괴 원인 규명 및 수정 (하이드레이션 경쟁 조건)

### 배경
"사이트에 애드센스가 제대로 설정돼 있나? 광고가 안 나온다"는 질문으로 시작. 초기엔 설정/승인 문제로 접근했으나 계정·정책·`ads.txt`·`robots.txt`·CSP가 전부 정상이었고, 실제 원인은 **코드 레벨의 하이드레이션 경쟁 조건**이었음. 애드센스 삽입 후 3개월간 잠복해 있던 문제.

### 오진 2회 (기록 목적 — 같은 길로 다시 가지 않기 위해)

1. **"트래픽이 적어서"** — 사용자가 "3개월 됐고 트래픽도 있는데 하나도 안 보인다"고 반박해 폐기
2. **"Cloudflare Rocket Loader 충돌"** — React 사이트에서 흔한 원인이라 지목했으나, 확인 결과 **애초에 꺼져 있었음**

두 번 다 정황 추론이었고, 세 번째에야 라이브 HTML을 직접 대조하는 방식으로 전환해 원인을 특정함.

### 원인

`app/layout.js`의 `<head>`에 애드센스가 생짜 `<script async>`로 들어가 있었음. 이 스크립트가 React 청크와 **동시에** 출발하는 경쟁 조건이 되어:

1. 애드센스가 먼저 실행되면 하이드레이션 전에 `<ins>` 광고 슬롯을 body에 주입
2. React가 SSR 결과와 다른 DOM을 발견 → **#418**(mismatch)
3. → **#423**으로 루트 전체를 클라이언트 렌더링으로 전환하며 **주입된 광고 슬롯이 함께 소멸**
4. 방문자마다 회선·기기·캐시 상태가 달라 매번 승패가 갈림 → 증상이 "광고 0"이 아니라 **"노출 절반"**으로 나타나 원인 파악이 어려웠음

### 진단 근거 (수치)

| 지표 | lalalakorea.com | 정상 기준 | 판정 |
|---|---|---|---|
| GA4 조회수 대비 애드센스 PV | **812 / 1,897 = 43%** | 70~85% | 광고 요청 자체가 누락 중 |
| PV당 광고 노출 수 | **1.73** | 형제 사이트 3.94~5.36 | 슬롯 소실 |
| 노출 RPM | ¥27 | trip.lalalakorea ¥131 | 별개 문제(니치 단가) |
| 조회가능 Active View | 55.7% | 정상 | 배치 문제 아님 |

페이지 RPM 11배 격차(¥47 vs ¥519)가 **광고 개수 2.3배 × 광고 단가 4.8배**로 정확히 분해됨. 이 중 개수(2.3배)만 기술 문제이고, 단가(4.8배)는 한국어 학습·K-POP이라는 저구매의도 니치에서 오는 구조적 요인이라 코드로 해결 불가.

### 오늘 한 일

1. **설정 전수 점검** — 애드센스 스크립트(`ca-pub-6443201130119317`) 삽입 상태, `ads.txt` 200 응답 및 내용, `robots.txt`의 광고 크롤러 차단 여부, 응답 헤더 CSP, `adsbygoogle.js` 자체 200 응답까지 전부 확인 — 이상 없음
2. **라이브 HTML과 컴포넌트 코드 대조** — SSR 마크업이 클라이언트 초기 렌더와 완전 일치함을 확인(`reading-progress-bar`의 `width:0%`, `AuthNav` 미렌더링, 햄버거의 `ham-line ` 트레일링 공백까지). **정적 미스매치가 없다**는 사실로 범위를 "런타임 DOM 변조"로 좁힘 → 시크릿 모드에서도 재현되므로 확장 프로그램이 아닌 **페이지 자신이 로드하는 스크립트**로 특정
3. **수정** — `<head>`의 생짜 `<script async>` 제거, `next/script` + `strategy="afterInteractive"`로 전환(같은 파일의 GA4가 이미 쓰던 패턴과 통일). head에는 `<link rel="preload">`만 남아 로딩 속도 손해 없음 (`299d47a`)
4. **빌드·배포·검증** — `next build` 통과 → 빌드 산출물 head에서 즉시실행 `<script>` 제거 확인 → WSL 경유 Cloudflare 실배포(Version ID `1fa44e14`) → 스모크 테스트 21개 항목 전부 통과 → 라이브 HTML에서 `preload`만 남은 것 재확인
5. **사용자 브라우저 육안 검증** — **#418/#423 콘솔 에러 완전 소멸**, 전면광고(vignette)·하단 앵커 광고가 실제로 렌더링되는 것 확인. 잔존 콘솔 메시지 3건(`data-nscript` 경고, `lidar.js`의 unload violation, `google_vignette`의 aria-hidden 차단)은 전부 구글 자체 광고 코드에서 발생하는 것으로 무해함을 확인
6. **재발 방지 문서화** — 글로벌 `~/.claude/CLAUDE.md`에 "애드센스 삽입 방식 필수 체크(React 사이트에서 head에 async 금지)" 섹션 신설. 진단 지표(GA4 대비 PV 비율, PV당 광고 수)와 오진 함정(조회가능률이 높다고 안심 금지 — 앵커 광고만 살아남은 것일 수 있음)까지 명시
7. **메모리 기록** — 애드센스 수익 진단 기준선(형제 사이트 대조표, 니치 단가가 주원인이라는 판단, 절대 수익 기대치를 부풀리지 말 것)을 프로젝트 메모리에 저장

### 완료된 항목

- [x] 애드센스 설정 전수 점검(스크립트·ads.txt·robots.txt·CSP·스크립트 응답) — 이상 없음 확인
- [x] 라이브 HTML 대조로 하이드레이션 경쟁 조건 원인 특정(오진 2회 후)
- [x] `app/layout.js` 애드센스를 `next/script`(`afterInteractive`)로 전환 (`299d47a`)
- [x] 빌드 검증 + Cloudflare 실배포 + 스모크 21항목 통과 + 라이브 curl 재확인
- [x] 브라우저에서 #418/#423 소멸 및 광고 실제 렌더링 육안 확인
- [x] 글로벌 CLAUDE.md에 애드센스 삽입 방식 체크리스트 신설
- [x] 애드센스 진단 기준선 메모리 기록

### 다음에 할 일

- [ ] **효과 측정 (약 1주 후)** — 애드센스에서 두 지표를 다시 확인해 회복 여부 판정:
  - **PV당 광고 노출 수**: 1.73 → 목표 3.5~4 (형제 사이트 수준)
  - **GA4 조회수 대비 애드센스 PV**: 43% → 목표 70~85%
  - 예상 수익은 월 ¥38 → **¥160~300** 수준. 이 이상은 기대하지 말 것
- [ ] **전면광고(vignette) 유지 여부 판단** — 단가는 높지만 화면을 가려 이탈률을 올림. 배포 후 이탈률 추이를 보고 애드센스 → 광고 → 사이트별 설정에서 이 형식만 끌지 결정
- [ ] **수익화 방향 재확인** — 노출 RPM ¥27은 코드로 못 고치는 니치 구조 문제. 월 1,897 조회수라는 트래픽도 근본 제약이라, CLAUDE.md Phase 3의 note.com PDF 판매가 이 사이트의 실질적 수익 경로. 광고 최적화보다 이쪽 우선
- [ ] **트래픽 편중 대응** — `/simkunkorean60` 한 페이지가 전체 트래픽의 **28.7%(545/1,897)**를 차지하는 극단적 구조. 이런 히트 글을 늘리는 방향으로 콘텐츠 기획
- [ ] 이전 세션 이월 항목 — CMS 초안 브랜치 4건 정리, CI/CD 자동배포 파이프라인, 실기기 육안 확인, Vercel 프로젝트 삭제 여부 등

---

## 2026-08-31 の作業内容 — 依頼表現レッスン新規作成・sitemap拡張・CMS初稿ブランチ整理

### 배경

사용자가 `/admin`(Decap CMS)에서 기사 **「「주세요」と「주실래요」、どっちを使う？韓国語の依頼表現を徹底解説」**(`content/posts/2026-08-31-korean-request-levels.md`, 間違えやすい韓国語シリーズ 第5回)의 썸네일과 본문을 수정한 뒤, 같은 주제의 학습 레슨 제작과 기사→레슨 링크 연결을 요청. 작업 중 CMS 워크플로 구조상의 문제와 sitemap 누락을 함께 발견해 처리함.

### 1. CMS 편집분 main 반영 (에디토리얼 워크플로 함정)

`public/admin/config.yml`의 `publish_mode: editorial_workflow` 때문에, `/admin`에서 저장한 내용은 `cms/posts/<슬러그>` 브랜치에만 커밋되고 **CMS에서 「公開」를 눌러야 비로소 main에 머지**된다. 사용자는 저장만 하고 발행을 누르지 않는 습관이 있어, 요청받은 "수정한 본문"이 로컬 main에 존재하지 않았음.

- `git fetch` → `cms/posts/2026-08-31-korean-request-levels` 발견 → main에 머지 (`0074b73`)
- 반영된 내용: 썸네일 `public/wp-content/uploads/korean-request-levels.png` 추가, frontmatter 재정렬

**머지 diff 검토 중 발견한 CMS 편집기 부작용 2건:**

| 문제 | 내용 |
|---|---|
| 빈 링크 | 참고링크의 「韓国旅行前に覚えるカタコト韓国語フレーズ」가 링크 텍스트만 삭제되어 `[](https://lalalakorea.com/korea-travel-phrases)` 로 남아 있었음 → 복구 |
| 마크다운 재포맷 | `---`→`- - -`, `-`→`*`, frontmatter 키 순서 변경, 테이블 정렬 재구성 (렌더 결과는 동일, 무해) |

추가로 `사진 찍어 주세요`의 카타카나 표기 오류(`チッコ` → `チゴ`)를 수정. 연음 규칙상 찍어=찌거이며, 바로 앞 4편(발음 규칙) 레슨에서 가르치는 내용과 모순되고 있었음.

### 2. 학습 레슨 신규 제작 — `/learn/request-levels`

`content/courses/request-levels/` 에 전 6레슨 코스 생성. 기존 코스와 동일한 스키마(`course.json` + 레슨별 frontmatter `words`/`quiz` + きなこ/ジュン 대화 HTML)를 따름.

| 레슨 | 제목 | 퀴즈 |
|---|---|---|
| 01-intro | 「ください」は1つじゃない | 3 |
| 02-juseyo | 依頼の基本は「動詞＋ジュセヨ」 | 3 |
| 03-jusillaeyo | 주실래요・주시겠어요｜やわらかく頼む | 3 |
| 04-levels | 丁寧さの5レベル | 3 |
| 05-travel | 旅行フレーズ｜そのまま使える依頼10選 | 3 |
| 06-final | 総合クイズ・修了 | 8 |

- 총 퀴즈 23문항, 복습 단어 20개 (코스 내 중복 없음)
- 기사에 없는 보너스: 03과에 依頼를 부드럽게 만드는 **「좀」**, 05과에 **「저기요」** 조합 활용법 추가
- 코스 메타: `emoji: 🙏`, `icon: hands-praying`(Phosphor 2.1.1), `level: 初級`, `category: grammar`
- 코스 데이터는 `scripts/generate-courses-data.mjs`가 디렉터리를 자동 스캔하므로 별도 등록 불필요 (교재 10 → 11개)

### 3. 기사 → 레슨 도선 연결

- 본문 하단(まとめ 뒤, 「次回は」 앞)에 CTA 블록 삽입 — 4편(발음 규칙) 기사와 동일 포맷
- 참고링크 최상단에 `/learn/request-levels` 추가
- 커밋 `58d11e7`

### 4. sitemap에 학습 콘텐츠 추가 (`96d8f98`)

`app/sitemap.js`가 포스트·카테고리만 포함하고 있어 **교재 11개 · 레슨 72개 · 단어팩 5개가 통째로 색인 대상에서 빠져 있던** 문제를 수정. 이번 코스만의 문제가 아니라 `/learn` 도입 이후 계속된 누락이었음.

- 추가: `/learn`, `/learn/packs`, `/learn/{course}`, `/learn/{course}/{lesson}`, `/learn/packs/{pack}`
- 제외: 로그인 필요 페이지(`/learn/notes`, `/learn/review`, `/learn/lessons`)
- `lastmod`는 `course.json` / 팩 json의 `date`를 사용 — 하드코딩된 동일 날짜가 아니라 실제 제작일로 분산 (전체 lastmod 고유값 80개)
- **URL 100 → 187개**

### 5. CMS 초안 브랜치 7건 전량 정리

이전 세션에서 "4건 정리"로 이월돼 있던 항목. 실제로는 7건까지 늘어나 있었음.

삭제 전 안전성 검증:

- 6건은 main의 조상 커밋(`git merge-base --is-ancestor`) → 내용이 정의상 main에 포함됨
- 1건(`cms/posts/2026-08-26-korean-pronunciation-rules`)만 미병합이라 현재 main과 직접 대조 → **브랜치 쪽이 더 오래된 버전**임을 확인:

| 항목 | main(현재) | 삭제한 브랜치 |
|---|---|---|
| `thumbnailAlt` | 있음 | 없음 |
| 학습 레슨 CTA 블록 | 있음 | 없음 |
| 국밥 표기 | `クッパプ`(수정됨) | `ククッパプ`(오타) |
| 썸네일 이미지 | 동일 blob `eecb421` | 동일 blob `eecb421` |

유실 없음을 확인하고 7건 전량 `git push origin --delete` → 원격에 `main`만 남음. 사용자에게 "되살릴 필요 없다"는 확인을 받음.

### 6. 검증·배포

- `npm run build` 통과 — 신규 6레슨 전부 SSG 프리렌더 확인, 정적 페이지 214개
- `next start` 로컬 기동 후 `/sitemap.xml` 실제 출력 검증 (187 URL, learn 87건)
- WSL 경유 `scripts/deploy-cloudflare.sh` 로 Cloudflare 실배포 2회
- 스모크 테스트 전부 통과 (배포 직후 1회차 캐시 MISS는 콜드 캐시 — 재실행 시 전부 HIT)
- 라이브 curl 확인: `/learn/request-levels`, `/01-intro`, `/06-final`, 썸네일 PNG, `/sitemap.xml`(200, `application/xml`) 전부 정상

### 완료된 항목

- [x] CMS 드래프트 브랜치에서 기사 편집분 main 반영 (`0074b73`)
- [x] CMS 편집기가 만든 빈 링크 복구 + 연음 표기 오류(`チッコ`→`チゴ`) 수정
- [x] `/learn/request-levels` 코스 신규 제작 — 6레슨 / 퀴즈 23 / 단어 20 (`58d11e7`)
- [x] 기사 본문 CTA + 참고링크에서 레슨 연결
- [x] `app/sitemap.js`에 학습 콘텐츠 87개 URL 추가 (`96d8f98`)
- [x] CMS 초안 브랜치 7건 전량 삭제 (이전 세션 이월 항목 해소)
- [x] 빌드·로컬 sitemap 출력·Cloudflare 배포·스모크·라이브 curl 검증
- [x] 프로젝트 메모리에 Decap 에디토리얼 워크플로 함정 기록

### 다음에 할 일

- [ ] **Search Console에 sitemap 재제출** — 새로 들어간 87개 학습 URL의 색인을 앞당기기 위함
- [ ] **간행 습관 정착** — `/admin`에서 저장 후 반드시 「公開」까지 누를 것. 저장만 하면 사이트에 반영되지 않고 `cms/*` 브랜치가 다시 쌓임
- [ ] **시리즈 6편 집필** — 「授受表現（주다・받다・드리다）」. 5편 본문에서 이미 예고했음. 집필 시 같은 패턴으로 `/learn/give-receive` 코스도 세트로 제작
- [ ] **애드센스 효과 측정 (2026-08-30 작업분)** — PV당 광고 노출 1.73 → 3.5~4, GA4 대비 애드센스 PV 43% → 70~85% 회복 여부 확인. 시점상 이번 주 중
- [ ] **신규 코스 `/learn` 노출 방식 재검토** — 코스가 11개가 되어 `COURSE_LIMIT=6` 뒤로 밀리는 코스가 5개. limit 상향 또는 카테고리 분류 필요
- [ ] **실기기 브라우저에서 신규 레슨 육안 확인** — 이번 세션도 curl/빌드 산출물 레벨 검증만 함
- [ ] 이전 세션 이월 — CI/CD 자동배포 파이프라인, Vercel 프로젝트 삭제 여부, Supabase 권한 정리, 안드로이드 앱 계획

---

## 2026-09-02 の作業内容

### 이미지 문제 2건 인수 → 조사해보니 둘 다 전달받은 전제가 틀려 있었음

사용자로부터 "① 한글 파일명 900개 때문에 Cloudflare 배포가 크래시한다 ② 예전 글 본문 이미지가 누락됐다" 2건을 전달받아 조사. 결과, 둘 다 **원인 진단 자체가 잘못돼 있었음**.

#### 1. 배포 크래시 — 전제 4가지 전부 반박됨

| 전달받은 전제 | 실제 확인 결과 |
|---|---|
| Windows wrangler가 한글 파일명 업로드 시 크래시 | 배포는 **WSL 안에서 전부 실행**됨(`scripts/deploy-cloudflare.sh`) — Windows wrangler를 애초에 안 씀 |
| 재빌드 시 900개가 "변경됨"으로 잡혀 전량 재업로드 | rsync가 `-c`(체크섬) 방식이라 dry-run에서 `public/` 재전송 대상 **0건** |
| 한글 파일명이라 못 올라간다 | 이미 라이브에서 200으로 정상 서빙 중이었음(사전 검증 완료) |
| 한글 파일명 900개 = 18MB | 실측 **148MB**. 게다가 일본어 파일명 711개(72MB)가 계획에서 아예 빠져 있었음 |

실제로 WSL 경유 배포를 1회 실행해 **크래시 재현 안 됨**을 확인(`Uploaded 211 of 211 assets`). 891개 삭제·900개 rename 둘 다 진행하지 않음 — 구글 이미지 검색·외부 링크를 깨뜨리고 되돌리기 어려운 작업이라 근거 없이는 손대지 않기로 함.

#### 2. 본문 이미지 누락 — 진짜 원인은 과거 커밋의 본문 절단

전수 조사 결과 **깨진 이미지 링크는 0건**(90개 글, 422~443건 참조 전부 대조). 대신 git 히스토리 스캔으로 진짜 원인을 특정: **2026-03-19 커밋 `fccb206`**(관련글 카드 도입 작업)이 각 글의 「オススメ関連記事」 마커부터 **파일 끝(EOF)까지 통째로 삭제**하고 있었음. 커밋 메시지가 "디자인 개선"이라 콘텐츠 손실로 안 보였고, 이후 AdSense 콘텐츠 보강 작업으로 줄 수가 다시 늘어나 3개월 넘게 발견되지 않았던 것.

**복원 1 — 이미지 20건** (`78f5a63`): korean-zodiac(13, 12支 카드 신설) / korean-study-oneplusone(3) / korean-beer・christmas-message2・chusok-instagram-image・korea-expression-of-gratitude-presents(각 1). `korean-study-christmas`의 이미지 1건은 base.shop 쇼핑몰 배너였고 다른 글에도 링크가 안 남아있어 의도적 철수로 보고 복원 제외.

**복원 2 — 본문 8개 글** (`308ab02`, +359줄): hashtag-valentines-day(§4~7 전체)・korean-hashtag-konstagram(조어 유래・야자 해설)・korean-school-uniform(서울공연예술고 상세)・bts-newword-armyforever(§3)・korea-expression-of-gratitude-presents(번외편)・koreandrama-netflix-squid1・korean-zodiac(한국 亥년은 돼지)・korean-study-oneplusone. 부수적으로 `bts-newword-armyforever`의 「아무행알」 해설 오류(「아무리 행동해도 알 수 없어」 → 올바르게는 「아미 무조건 행복해야 돼 알겠지」 두문자)도 발견해 정정.

단순 라인 diff로는 손실이 42,500자로 잡혔으나, 인스타 임베드 잔해·`**`→`<strong>` 마크업 차이로 인한 오차를 걷어내니 실제는 **약 15,000자**였음(이 중 8개 글 복원으로 해소). 나머지 A그룹(제휴 없음) 9개 약 4,000자, B그룹(제휴 상품 섹션 포함) 5개는 사용자 판단으로 **보류** — B그룹은 AdSense 심사 때 제휴 광고 정리 흐름과 맞아 복원하지 않는 쪽으로 결론.

**추가 수정** (`bfef761`): 사용자가 "제복은 여전히 노란색"이라고 정정 — 복원 시 현행 본문에 남아있던 "ネイビー基調" 오기를 원본대로 "黄色いジャケット（이상봉 디자인）"로 되돌림.

### 미사용 이미지 현황 조사 → WP 자동 리사이즈 변형본 5,292개 삭제 (`7f5bb42`)

"사용 안 하는 이미지가 많다"는 지적에 전수 집계: `public/` 5,984개(699.6MB) 중 95%(5,686개, 623MB)가 미참조. 원인 분류 결과 93%는 **워드프레스가 이미지 1장 올릴 때마다 자동 생성하는 사이즈 변형본**(`-150x150.png`, `-300x300.png` 등)이었고, 진짜 "업로드는 됐는데 안 쓰는 오리지널"은 386개(157MB)뿐이었음.

- 삭제: 리사이즈 변형본 5,292개(464MB). 오리지널은 전량 보존, 실제로 글에서 참조 중인 변형본 79개(chat-avatar 썸네일 등)는 자동 제외
- 검증: 삭제 전후로 전체 이미지 참조 재대조 → 깨진 링크 0건
- 결과: `public/` 5,984개(699.6MB) → **692개(235.5MB)**
- 라이브 확인: 삭제한 파일 404, 오리지널·예외 79건은 200 유지

### 신규 단어팩 2개 제작 (`442f90d`)

`korean-greetings-manners`(ソルラル)・`korean-chuseok-manners`(チュソク) 두 글에 대응하는 단어팩을 각 10어씩 신규 작성. 각 글 본문에서 실제 쓰인 표현만 발췌(예: 새해 복 많이 받으세요・세뱃돈 / 즐거운 한가위 보내세요・송편).

- `content/wordpacks/seollal.json`, `content/wordpacks/chuseok.json` 추가
- 두 글의 「参考リンク」 목록에 팩 CTA를 맨 위 항목으로 삽입(기존 `jeju-travel`・`korean-neologisms-2026` 글의 연결 패턴을 그대로 따름)
- `npx next build` 로 `/learn/packs/seollal`・`/learn/packs/chuseok` 정적 경로 생성 확인 후 배포

### CMS 편집 반영

세션 도중 사용자가 `/admin`에서 두 신규 글(설날・추석)의 썸네일을 직접 추가 → PR #10(`34de09e`)・#11(`8753ed7`)로 머지된 걸 발견하고 그때마다 rebase로 흡수. Decap 초안 브랜치가 다시 쌓이는 걸 막기 위해 발견 즉시 처리.

### 검증・배포

- 이번 세션에서 총 **4회** WSL 배포(`scripts/deploy-cloudflare.sh`) 실행, 매번 스모크 테스트 통과
- 배포 직후 팩 페이지가 순간적으로 404였다가 수 초 뒤 200으로 정상화되는 CDN 전파 지연 재확인(기존에도 있던 현상, 재발이 아님)
- 이미지 삭제·본문 복원·단어팩 신규 경로 모두 라이브 curl로 직접 확인 완료

### 완료된 항목

- [x] 배포 크래시 원인 조사 — 전제 반증, 삭제/rename 불필요 결론
- [x] 본문 이미지 전수 조사 — 깨진 링크 0건 확인
- [x] fccb206 절단 이미지 20건 복원 (`78f5a63`)
- [x] fccb206 절단 본문 8개 글 복원 + 사실오류 1건 정정 (`308ab02`)
- [x] 서울공연예술고 제복 색상 오기 정정 (`bfef761`)
- [x] WP 자동 리사이즈 변형본 5,292개(464MB) 삭제 (`7f5bb42`)
- [x] 설날・추석 단어팩 2개 신규 제작 + 글 연동 (`442f90d`)
- [x] CMS 편집분(PR #10, #11) rebase 흡수
- [x] 프로젝트 메모리에 fccb206 절단 사고・배포 크래시 가설 반증 내용 기록

### 다음에 할 일

- [ ] **A그룹 잔여 9개 본문 복원 검토** — yuns-kitchen-1・korean-snowbird・korean-simukun・korean-happynewyear-massege 등, 약 4,000자. 제휴 링크 없음, 복원해도 안전
- [ ] **B그룹 5개는 복원 안 하기로 확정** — korean-face-pack・muziktiger・korean-collaboration-beer 등 제휴 상품 섹션 포함. 재검토 불필요
- [ ] **오리지널 미사용 이미지 386개(157MB) 재검토** — 오늘은 리사이즈 변형본만 정리. 오리지널은 진짜 안 쓰는 건지 개별 확인 필요
- [ ] 이전 세션 이월 — Search Console sitemap 재제출, 시리즈 6편(授受表現) 집필, 애드센스 효과 측정, `/learn` 코스 노출 방식 재검토, CI/CD 자동배포, Vercel 프로젝트 정리, Supabase 권한 정리, 안드로이드 앱 계획

---

*最終更新: 2026-09-02*
