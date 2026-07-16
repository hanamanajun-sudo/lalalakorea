import LoginForm from './LoginForm';

export const metadata = {
  title: 'ログイン | LaLaLaKorea',
  description: 'LaLaLaKoreaの学習コンテンツにログインして、進捗を保存しましょう。',
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>ログイン / 新規登録</h1>
        <p className="login-desc">
          メールアドレスを入力すると、ログイン用リンクが届きます。<br />
          パスワードは不要です
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
