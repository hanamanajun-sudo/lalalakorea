'use client';
import { useState } from 'react';

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      id: 'x',
      label: 'X でシェア',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      bg: '#000',
      color: '#fff',
    },
    {
      id: 'line',
      label: 'LINE でシェア',
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
        </svg>
      ),
      bg: '#06C755',
      color: '#fff',
    },
    {
      id: 'hatena',
      label: 'はてブ',
      href: `https://b.hatena.ne.jp/add?mode=confirm&url=${encodedUrl}&title=${encodedTitle}`,
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M20.47 0C22.42 0 24 1.58 24 3.53v16.94C24 22.42 22.42 24 20.47 24H3.53C1.58 24 0 22.42 0 20.47V3.53C0 1.58 1.58 0 3.53 0h16.94zm-3.705 14.47c-.57 0-1.032.46-1.032 1.03 0 .57.46 1.032 1.032 1.032.57 0 1.03-.462 1.03-1.032 0-.568-.46-1.03-1.03-1.03zm-7.834-4.03c.94 0 1.686-.198 2.24-.594.553-.396.83-.975.83-1.74 0-.5-.136-.918-.406-1.254-.27-.335-.65-.553-1.14-.653v-.053c.41-.138.724-.364.94-.68.215-.313.323-.68.323-1.098 0-.717-.252-1.258-.753-1.622C10.47 2.36 9.768 2.158 8.86 2.158H5.664v8.28H8.93zm-.41-4.936c.5 0 .878.097 1.132.29.254.195.38.49.38.89 0 .38-.13.665-.39.853-.26.188-.648.282-1.163.282H7.27V5.505l1.25-.002zm.19 3.248c.57 0 1.003.107 1.297.32.294.214.44.543.44.99 0 .43-.154.752-.46.97-.308.217-.762.325-1.362.325H7.27V9.75l1.44.002zm7.555-3.248v-.002a3.3 3.3 0 0 0-2.35.974 3.3 3.3 0 0 0-.973 2.35c0 .917.325 1.7.974 2.35a3.3 3.3 0 0 0 2.35.974 3.3 3.3 0 0 0 2.35-.974 3.3 3.3 0 0 0 .974-2.35 3.3 3.3 0 0 0-.974-2.35 3.3 3.3 0 0 0-2.35-.974v.002zm0 1.376c.537 0 .996.19 1.377.572.38.38.572.84.572 1.377 0 .537-.19.997-.572 1.377-.38.382-.84.573-1.377.573-.537 0-.997-.19-1.377-.573-.382-.38-.573-.84-.573-1.377 0-.537.19-.996.573-1.377.38-.38.84-.572 1.377-.572z"/>
        </svg>
      ),
      bg: '#00A4DE',
      color: '#fff',
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="share-box">
      <p className="share-label">この記事をシェアする</p>
      <div className="share-buttons">
        {shareLinks.map(({ id, label, href, icon, bg, color }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
            style={{ background: bg, color }}
            aria-label={label}
          >
            {icon}
            <span>{id === 'hatena' ? 'はてブ' : id === 'line' ? 'LINE' : 'X'}</span>
          </a>
        ))}

        <button
          className="share-btn share-btn-copy"
          onClick={handleCopy}
          aria-label="URLをコピー"
        >
          {copied ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
          )}
          <span>{copied ? 'コピー済！' : 'URLコピー'}</span>
        </button>
      </div>
    </div>
  );
}
