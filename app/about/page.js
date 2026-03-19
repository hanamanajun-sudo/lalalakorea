export const metadata = {
  title: 'About – LalaLaKorea',
  description: 'LalaLaKoreaについて。日本在住10年の韓日夫婦が運営する韓国語・韓国文化ブログです。',
};

export default function AboutPage() {
  return (
    <div className="about-page">

      {/* ヒーロー */}
      <div className="about-hero">
        <div className="about-hero-emoji">🇰🇷 × 🇯🇵</div>
        <h1 className="about-hero-title">LalaLaKoreaって？</h1>
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
              <strong>LalaLaKorea</strong>は、韓国語学習・韓国グルメ・韓国エンタメ・旅行・コスメなど、
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
              <p className="about-author-desc" style={{color: '#aaa', fontSize: '0.85rem', marginTop: '8px'}}>
                ※ 詳しいプロフィールは近日公開予定です 🙏
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
              <img className="character-avatar-img" src="https://lalalakorea.com/wp-content/uploads/2021/08/1455763-150x150.jpg" alt="きなこ" />
              <div className="character-name">きなこ</div>
              <div className="character-role">メインキャラ</div>
              <p className="character-desc">
                ふわふわ系だけど実は芯がある。
                韓国のことが大好きで、いつも熱く語ってくれる存在。
              </p>
            </div>

            <div className="character-card">
              <img className="character-avatar-img" src="https://lalalakorea.com/wp-content/uploads/2021/08/1270157-150x150.jpg" alt="ハル" />
              <div className="character-name">ハル</div>
              <div className="character-role">ツッコミ担当</div>
              <p className="character-desc">
                冷静でちょっとクールなキャラ。
                でも韓国グルメの話になると誰より食いつく。
              </p>
            </div>

            <div className="character-card">
              <img className="character-avatar-img" src="https://lalalakorea.com/wp-content/uploads/2021/08/245689-231x300.jpg" alt="ジュン" />
              <div className="character-name">ジュン</div>
              <div className="character-role">案内役</div>
              <p className="character-desc">
                韓国と日本、両方をよく知る頼れる存在。
                いろんな話題をわかりやすく解説してくれる。
              </p>
            </div>

            <div className="character-card">
              <img className="character-avatar-img" src="https://lalalakorea.com/wp-content/uploads/2021/11/135882.jpg" alt="ミオ" />
              <div className="character-name">ミオ</div>
              <div className="character-role">K-POP担当</div>
              <p className="character-desc">
                K-POPとコスメならお任せあれ。
                テンションが高めで場を盛り上げるムードメーカー。
              </p>
            </div>

            <div className="character-card">
              <img className="character-avatar-img" src="https://lalalakorea.com/wp-content/uploads/2021/10/제목을-입력해주세요_-002.png" alt="악어오빠" />
              <div className="character-name">악어오빠</div>
              <div className="character-role">韓国代表</div>
              <p className="character-desc">
                韓国側の本音を届けてくれるキャラ。
                たまに辛口だけど、愛情たっぷり。
              </p>
            </div>

          </div>
        </section>

        {/* お問い合わせ */}
        <section className="about-section">
          <h2 className="about-section-title">📬 お問い合わせ</h2>
          <div className="about-card" style={{textAlign: 'center'}}>
            <p>ご質問・ご感想・お仕事のご依頼など、お気軽にどうぞ 😊</p>
            <a href="mailto:hanamanajun@gmail.com" className="about-contact-btn">
              ✉️ メールを送る
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
