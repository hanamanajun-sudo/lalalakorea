export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/', '/wp-login.php', '/wp-admin/'] },
    ],
    sitemap: 'https://lalalakorea.com/sitemap.xml',
  };
}
