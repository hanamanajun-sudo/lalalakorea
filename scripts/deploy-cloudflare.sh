#!/bin/bash
# WSL(Linux)에서 실행하는 Cloudflare Workers 배포 스크립트.
#
# OpenNext는 Windows에서 빌드가 되지 않으므로(exit 127), Windows 쪽 작업 트리를
# WSL 안의 빌드 디렉터리로 동기화한 뒤 거기서 빌드·배포한다.
#
# cf:deploy(= opennextjs-cloudflare build && opennextjs-cloudflare deploy)를 쓰는 이유:
# deploy 단계가 populate-cache를 돌려 prerender된 페이지를 정적 에셋에 채운다.
# 이걸 건너뛰고 wrangler deploy만 하면 캐시가 비어 전 요청이 SSR로 돌아간다.
#
# 사용법 (Windows 터미널):
#   wsl.exe -d Ubuntu -- bash "/mnt/c/.../lalalakorea/scripts/deploy-cloudflare.sh"
#   ... --dry-run 을 붙이면 동기화 대상만 출력하고 배포하지 않는다.
set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DST="${LALALAKOREA_BUILD_DIR:-$HOME/lalalakorea-cf-build}"
DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

RSYNC_OPTS=(
  -rc --delete --itemize-changes
  --exclude 'node_modules/' --exclude '.next/' --exclude '.open-next/'
  --exclude '.git/' --exclude '.wrangler/' --exclude '.vercel/'
  --exclude 'lib/*.generated.json'
)

echo "SRC: $SRC"
echo "DST: $DST"
[ -d "$DST" ] || { echo "빌드 디렉터리가 없습니다: $DST" >&2; exit 1; }

if [ "$DRY_RUN" = "1" ]; then
  echo "===== [dry-run] 동기화 대상 ====="
  rsync "${RSYNC_OPTS[@]}" --dry-run "$SRC/" "$DST/"
  echo "===== [dry-run] 배포는 실행하지 않았습니다 ====="
  exit 0
fi

echo "===== [1/3] rsync ====="
rsync "${RSYNC_OPTS[@]}" "$SRC/" "$DST/"

echo "===== [2/3] cf:deploy ====="
cd "$DST"
npm run cf:deploy

echo "===== [3/3] 라이브 스모크 테스트 ====="
npm run smoke
