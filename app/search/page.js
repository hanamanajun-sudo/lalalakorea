import { getAllPosts } from '../../lib/posts';
import SearchClient from './SearchClient';

export const metadata = {
  title: '記事を検索 | LaLaLaKorea',
  description: 'LaLaLaKoreaの記事をキーワードで検索できます。',
};

export default function SearchPage() {
  // 빌드 시 모든 글 데이터를 Client Component에 전달
  const posts = getAllPosts();

  // 검색에 필요한 필드만 추려서 전송 (번들 크기 최소화)
  const searchData = posts.map(({ slug, title, excerpt, categories, thumbnail, date }) => ({
    slug, title, excerpt, categories, thumbnail, date,
  }));

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <h1 className="search-page-title">記事を検索</h1>
      <SearchClient posts={searchData} />
    </div>
  );
}
