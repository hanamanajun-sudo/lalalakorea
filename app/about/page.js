import ContactButton from './ContactButton';

export const metadata = {
  title: 'About – LaLaLaKorea',
  description: '韓国出身・日本在住10年のジュンが運営するLaLaLaKoreaについて。韓日夫婦の日常から韓国語・韓国文化・Kpopを発信しています。',
  alternates: { canonical: 'https://lalalakorea.com/about/' },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'ジュン（주논）',
  url: 'https://lalalakorea.com/about/',
  description: '韓国出身、日本在住10年。日本人夫ハルと韓日夫婦として生活しながら、韓国文化・韓国語・Kpopを日本語で発信中。',
  knowsLanguage: ['ko', 'ja'],
  sameAs: ['https://lalalakorea.com'],
};

export default function AboutPage() {
  return (
    <div className="about-page">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      {/* ヒーロー */}
      <div className="about-hero">
        <div className="about-hero-emoji">🇰🇷 × 🇯🇵</div>
        <h1 className="about-hero-title">LaLaLaKoreaって？</h1>
        <p className="about-hero-sub">
          韓国と日本をつなぐ、日常のあれこれを綴るブログです
        </p>
      </div>

      <div className="about-container">

        {/* ブログ紹介 */}
        <section className="about-section">
          <h2 className="about-section-title">📖 このブログについて</h2>
          <div className="about-card">
            <p>
              <strong>LaLaLaKorea</strong>は、韓国語学習・韓国グルメ・韓国エンタメ・旅行・コスメなど、
              「韓国」にまつわるあれこれを楽しく発信するブログです。
            </p>
            <p>
              むずかしいことは抜きにして、日常の中で感じた韓国のこと、
              リアルな体験談、ちょっとためになる情報をのんびり届けています。
            </p>
            <p>
              ブログの中では、おなじみのキャラクターたちが登場して
              おしゃべりしながら話を進めていくスタイルも特徴のひとつ。
              読んでいるうちに、なんだか友達の話を聞いているような気持ちになってもらえたら嬉しいです 😊
            </p>
            <div className="about-tags">
              <span className="about-tag">🇰🇷 韓国語</span>
              <span className="about-tag">🍜 グルメ</span>
              <span className="about-tag">🎬 エンタメ</span>
              <span className="about-tag">✈️ 旅行</span>
              <span className="about-tag">💄 コスメ</span>
              <span className="about-tag">💬 日常</span>
            </div>
          </div>
        </section>

        {/* 運営者紹介 */}
        <section className="about-section">
          <h2 className="about-section-title">👋 運営者について</h2>
          <div className="about-card about-author-card">
            <div className="about-author-icon">🏠</div>
            <div className="about-author-content">
              <h3 className="about-author-name">ジュン</h3>
              <p className="about-author-desc">
                韓日夫婦で、日本に移住してはや<strong>10年</strong>。
                日本での暮らしの中で感じた韓国のこと、
                韓国と日本の「あるある」をゆるゆると発信しています。
              </p>
              <p className="about-author-desc">
                韓国・ソウル出身。日本人のハルと結婚し、日本に移住してはや<strong>10年</strong>。
                最初は日本語も文化も手探りだったけど、今では日本の暮らしが大好きに 🐱
              </p>
              <p className="about-author-desc">
                韓国のことを「もっと楽しく、もっと身近に」感じてほしくて、
                このブログを始めました。難しいことは抜きで、
                リアルな体験をそのままお届けします！
              </p>
            </div>
          </div>
        </section>

        {/* キャラクター紹介 */}
        <section className="about-section">
          <h2 className="about-section-title">🎭 登場キャラクター</h2>
          <p className="about-section-desc">
            ブログに登場するおなじみのメンバーたちをご紹介します！
          </p>
          <div className="about-characters">

            <div className="character-card">
              <div className="character-avatar">🇰🇷</div>
              <div className="character-name">ジュン（准）</div>
              <div className="character-role">筆者</div>
              <p className="character-desc">
                韓国出身・筆者。一人称は「私（ジュン）」または「우리（ウリ）夫婦」で話す。
                韓国と日本、両方をよく知る頼れる案内役。
              </p>
            </div>

            <div className="character-card">
              <div className="character-avatar">🇯🇵</div>
              <div className="character-name">ハル</div>
              <div className="character-role">妻</div>
              <p className="character-desc">
                日本人の妻。温かくて優しい。韓国語レベルは初級〜中級。
                簡単な会話や単語は理解できるけど、難しい表現は分からない。
              </p>
            </div>

            <div className="character-card">
              <div className="character-avatar">📚</div>
              <div className="character-name">かのん</div>
              <div className="character-role">娘</div>
              <p className="character-desc">
                ジュンとハルの娘。絵と本が好きな中学生。
                韓国語の聞き取りはかなりできるがハングルは読めない。
              </p>
            </div>

            <div className="character-card">
              <div className="character-avatar">🐶</div>
              <div className="character-name">ここア</div>
              <div className="character-role">飼い犬</div>
              <p className="character-desc">
                飼い犬。ふわふわで愛らしく、人懐こい。
                関連がある記事では登場する、家族の大事な一員。
              </p>
            </div>

            <div className="character-card">
              <div className="character-avatar">🐱</div>
              <div className="character-name">きなこ</div>
              <div className="character-role">猫ちゃん</div>
              <p className="character-desc">
                猫ちゃん。ふわふわで愛らしい。
                家族の一員として時々ブログに登場。
              </p>
            </div>

            <div className="character-card">
              <div className="character-avatar">🎬</div>
              <div className="character-name">ミオ</div>
              <div className="character-role">ゲスト</div>
              <p className="character-desc">
                韓国ドラマとK-POPが大好き。
                エンタメ関連の記事でよく登場するゲストキャラ。
              </p>
            </div>

            <div className="character-card">
              <div className="character-avatar">🐊</div>
              <div className="character-name">アゴオッパ（악어오빠）</div>
              <div className="character-role">ジュンの弟</div>
              <p className="character-desc">
                ジュンの弟。愛称は「악어오빠（악어オッパ）」。
                韓国側の視点からの本音を届けてくれるキャラ。
              </p>
            </div>

          </div>
        </section>

        {/* お問い合わせ */}
        <section className="about-section">
          <h2 className="about-section-title">📬 お問い合わせ</h2>
          <div className="about-card" style={{textAlign: 'center'}}>
            <p>ご質問・ご感想・お仕事のご依頼など、お気軽にどうぞ 😊</p>
            <p style={{fontSize: '0.85rem', color: '#aaa', margin: '12px 0'}}>
              hanamanajun [at] gmail.com
            </p>
            <ContactButton />
          </div>
        </section>

      </div>
    </div>
  );
}
