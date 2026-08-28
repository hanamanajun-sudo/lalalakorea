import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  // 빌드 시 미리 생성된 페이지를 Workers 정적 에셋에서 그대로 읽어 응답한다.
  // 미설정 시 캐시가 no-op이라 모든 요청(홈·포스트·카테고리 전부)이 매번 SSR로
  // 렌더링됐고, 이것이 Worker CPU 시간 초과의 실제 원인이었다.
  // 이 사이트는 온디맨드 재검증(revalidate)을 쓰지 않으므로 읽기 전용 캐시로 충분하다.
  incrementalCache: staticAssetsIncrementalCache,
});
