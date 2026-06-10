import ContactButton from '../about/ContactButton';

export const metadata = {
  title: 'お問い合わせ – LaLaLaKorea',
  description: 'LaLaLaKoreaへのお問い合わせはこちらから。ご質問・ご感想・お仕事のご依頼など、お気軽にどうぞ。',
  alternates: { canonical: 'https://lalalakorea.com/contact/' },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'お問い合わせ – LaLaLaKorea',
  url: 'https://lalalakorea.com/contact/',
  description: 'LaLaLaKoreaへのお問い合わせページ',
};

export default function ContactPage() {
  return (
    <div className="about-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />

      <div className="about-hero">
        <div className="about-hero-emoji">📬</div>
        <h1 className="about-hero-title">お問い合わせ</h1>
        <p className="about-hero-sub">
          ご質問・ご感想・お仕事のご依頼など、お気軽にどうぞ
        </p>
      </div>

      <div className="about-container">
        <section className="about-section">
          <div className="about-card" style={{ textAlign: 'center' }}>
            <h2 className="about-section-title" style={{ marginBottom: '16px' }}>📧 メールでのお問い合わせ</h2>
            <p>
              ブログの内容に関するご質問、韓国語・韓国文化についてのご相談、
              お仕事のご依頼など、何でもお気軽にご連絡ください。
            </p>
            <p style={{ fontSize: '0.85rem', color: '#aaa', margin: '12px 0' }}>
              hanamanajun [at] gmail.com
            </p>
            <ContactButton />
            <p style={{ marginTop: '24px', fontSize: '0.85rem', color: '#999' }}>
              ※ お返事まで数日かかる場合がございます。ご了承ください。
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="about-card">
            <h2 className="about-section-title">💬 よくあるお問い合わせ</h2>
            <div style={{ marginTop: '12px' }}>
              <p><strong>Q. 韓国語の勉強方法について教えてほしい</strong></p>
              <p style={{ marginBottom: '16px', color: '#666' }}>
                ブログ内の<a href="/category/%E9%9F%93%E5%9B%BD%E8%AA%9E" style={{ color: '#ff6b9d' }}>韓国語カテゴリ</a>で多数の学習コンテンツを公開しています。具体的な疑問はメールでもお気軽に！
              </p>
              <p><strong>Q. 記事の内容について質問したい</strong></p>
              <p style={{ marginBottom: '16px', color: '#666' }}>
                上記のメールアドレスにご連絡ください。できる限りお答えします。
              </p>
              <p><strong>Q. コラボ・タイアップのご依頼</strong></p>
              <p style={{ color: '#666' }}>
                韓国文化・韓国語・K-POP関連のご依頼は歓迎しております。詳細はメールにてご相談ください。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
