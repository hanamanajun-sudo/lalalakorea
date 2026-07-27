export const metadata = {
  title: 'プライバシーポリシー – LaLaLaKorea',
  description: 'LaLaLaKoreaのプライバシーポリシーです。個人情報の取り扱い、Cookieの使用、広告配信についてご確認ください。',
  alternates: { canonical: 'https://lalalakorea.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="privacy-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>プライバシーポリシー</h1>
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '40px' }}>最終更新日：2024年1月1日</p>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', borderBottom: '2px solid #ff6b9d', paddingBottom: '8px', marginBottom: '16px' }}>1. 基本方針</h2>
        <p>
          LaLaLaKorea（以下「当サイト」）は、ユーザーの個人情報の保護を重要と考え、
          個人情報保護法をはじめとする法令を遵守し、適切に取り扱います。
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', borderBottom: '2px solid #ff6b9d', paddingBottom: '8px', marginBottom: '16px' }}>2. 収集する情報</h2>
        <p>当サイトでは、以下の情報を収集する場合があります。</p>
        <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
          <li>お問い合わせフォームからご連絡いただいた際のメールアドレスおよびお名前</li>
          <li>アクセス解析ツールによるアクセスログ（IPアドレス、ブラウザ情報、参照URLなど）</li>
          <li>Cookieを通じて取得される行動情報</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', borderBottom: '2px solid #ff6b9d', paddingBottom: '8px', marginBottom: '16px' }}>3. Cookieについて</h2>
        <p>
          当サイトでは、ユーザーの利便性向上やアクセス解析のためにCookieを使用しています。
          Cookieは、ブラウザの設定から無効にすることが可能ですが、
          一部のサービスが正常に機能しなくなる場合があります。
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', borderBottom: '2px solid #ff6b9d', paddingBottom: '8px', marginBottom: '16px' }}>4. 広告について（Google AdSense）</h2>
        <p>
          当サイトでは、Google LLC（以下「Google」）が提供するGoogleアドセンスを利用しています。
          Googleはユーザーのウェブサイトへのアクセス情報に基づいて広告を配信するために、
          Cookieを使用することがあります。
        </p>
        <p style={{ marginTop: '12px' }}>
          Googleによる広告Cookieの使用は、
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b9d' }}>
            Googleの広告およびプライバシーポリシー
          </a>
          に基づいています。
          ユーザーは
          <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b9d' }}>
            Googleの広告設定ページ
          </a>
          でパーソナライズ広告を無効にすることができます。
        </p>
        <p style={{ marginTop: '12px' }}>
          第三者配信事業者や広告ネットワークによる広告掲載の詳細については、
          <a href="https://www.networkadvertising.org/understanding-online-advertising" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b9d' }}>
            Network Advertising Initiative
          </a>
          をご参照ください。
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', borderBottom: '2px solid #ff6b9d', paddingBottom: '8px', marginBottom: '16px' }}>5. アクセス解析について</h2>
        <p>
          当サイトでは、Googleが提供するアクセス解析ツール「Google Analytics」を使用しています。
          Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。
          収集されたデータは匿名で収集されており、個人を特定するものではありません。
          この機能はCookieを無効にすることで拒否することができます。
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', borderBottom: '2px solid #ff6b9d', paddingBottom: '8px', marginBottom: '16px' }}>6. 個人情報の第三者提供</h2>
        <p>
          当サイトは、法令に基づく場合を除き、ユーザーの個人情報を
          本人の同意なく第三者に提供することはありません。
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', borderBottom: '2px solid #ff6b9d', paddingBottom: '8px', marginBottom: '16px' }}>7. 免責事項</h2>
        <p>
          当サイトに掲載されている情報の正確性については万全を期していますが、
          内容の完全性・正確性・有用性等について一切の保証を行いません。
          当サイトの利用によって生じたいかなる損害についても、
          当サイト運営者は責任を負いかねます。
        </p>
        <p style={{ marginTop: '12px' }}>
          また、当サイトからリンクやバナーなどによって他のサイトに移動した場合、
          移動先サイトで提供される情報、サービスについて一切の責任を負いません。
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', borderBottom: '2px solid #ff6b9d', paddingBottom: '8px', marginBottom: '16px' }}>8. 著作権</h2>
        <p>
          当サイトに掲載されている文章・画像・動画等のコンテンツの著作権は、
          当サイト運営者に帰属します。
          無断転載・複製・改変等はご遠慮ください。
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', borderBottom: '2px solid #ff6b9d', paddingBottom: '8px', marginBottom: '16px' }}>9. お問い合わせ</h2>
        <p>
          プライバシーポリシーに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
        </p>
        <p style={{ marginTop: '12px', fontWeight: 'bold' }}>
          hanamanajun [at] gmail.com
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.2rem', borderBottom: '2px solid #ff6b9d', paddingBottom: '8px', marginBottom: '16px' }}>10. プライバシーポリシーの変更</h2>
        <p>
          当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
          変更後のプライバシーポリシーは、当ページに掲載した時点から効力を生じるものとします。
        </p>
      </section>
    </div>
  );
}
