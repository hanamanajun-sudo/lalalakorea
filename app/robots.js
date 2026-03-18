export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/admin/' },
    ],
    sitemap: 'https://lalalakorea.com/sitemap.xml',
  };
}
