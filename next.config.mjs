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
    ];
  },
};
export default nextConfig;
