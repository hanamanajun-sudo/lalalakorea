/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // www → apex 리디렉션
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.lalalakorea.com' }],
        destination: 'https://lalalakorea.com/:path*',
        permanent: true,
      },
      // 구 쿼리스트링 페이지네이션(?page=N) → 신 정적 라우트(/page/N)로 리디렉션
      {
        source: '/',
        has: [{ type: 'query', key: 'page', value: '(?<page>.*)' }],
        destination: '/page/:page',
        permanent: true,
      },
      {
        source: '/category/:name',
        has: [{ type: 'query', key: 'page', value: '(?<page>.*)' }],
        destination: '/category/:name/page/:page',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
