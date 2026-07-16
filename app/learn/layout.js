import LearnNav from './LearnNav';

export default function LearnLayout({ children }) {
  return (
    <div className="learn-shell">
      <LearnNav />
      <div className="learn-shell-main">{children}</div>
    </div>
  );
}
