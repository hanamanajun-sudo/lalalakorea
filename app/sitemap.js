import { getAllPosts, getAllCategories } from '../lib/posts';
import { getAllCourses, getCourse } from '../lib/courses';
import { getAllWordPacks } from '../lib/wordpacks';

export default function sitemap() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const courses = getAllCourses();
  const packs = getAllWordPacks();

  const postUrls = posts.map(post => ({
    url: `https://lalalakorea.com/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const categoryUrls = categories.map(cat => {
    const postsInCategory = posts.filter(p => p.categories.includes(cat));
    const latestDate = postsInCategory.reduce((latest, p) => {
      const d = p.date ? new Date(p.date) : null;
      return d && (!latest || d > latest) ? d : latest;
    }, null);
    return {
      url: `https://lalalakorea.com/category/${encodeURIComponent(cat)}`,
      lastModified: (latestDate || new Date()).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6,
    };
  });

  // 教材トップ + 各教材 + 各レッスン
  const courseUrls = [];
  for (const course of courses) {
    const lastModified = course.date ? new Date(course.date).toISOString() : new Date().toISOString();
    courseUrls.push({
      url: `https://lalalakorea.com/learn/${course.id}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
    const detail = getCourse(course.id);
    for (const lesson of detail?.lessons || []) {
      courseUrls.push({
        url: `https://lalalakorea.com/learn/${course.id}/${lesson.id}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  // 単語パック
  const packUrls = packs.map(pack => ({
    url: `https://lalalakorea.com/learn/packs/${pack.id}`,
    lastModified: pack.date ? new Date(pack.date).toISOString() : new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // 学習トップは教材の最新日付を反映
  const latestCourseDate = courses.reduce((latest, c) => {
    const d = c.date ? new Date(c.date) : null;
    return d && (!latest || d > latest) ? d : latest;
  }, null);

  return [
    {
      url: 'https://lalalakorea.com/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://lalalakorea.com/about',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://lalalakorea.com/contact',
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://lalalakorea.com/privacy',
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://lalalakorea.com/learn',
      lastModified: (latestCourseDate || new Date()).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://lalalakorea.com/learn/packs',
      lastModified: (latestCourseDate || new Date()).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...postUrls,
    ...categoryUrls,
    ...courseUrls,
    ...packUrls,
  ];
}
