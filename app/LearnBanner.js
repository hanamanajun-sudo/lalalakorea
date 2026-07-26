'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

function trackEvent(name, params) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

// 記事上部に表示する学習機能の告知バナー（検索流入者への導線）
// A/Bテスト：CSS版（軽量・即時表示）と 画像版（イラストバナー）を50/50でランダム表示
export default function LearnBanner() {
  const [variant, setVariant] = useState('css'); // SSR/初期表示は軽量なCSS版

  useEffect(() => {
    const chosen = Math.random() < 0.5 ? 'image' : 'css';
    setVariant(chosen);
    trackEvent('learn_banner_impression', { variant: chosen });
  }, []);

  function handleClick() {
    trackEvent('learn_banner_click', { variant });
  }

  if (variant === 'image') {
    return (
      <Link href="/learn" className="learn-banner learn-banner-image" onClick={handleClick}>
        <div className="learn-banner-image-overlay">
          <div className="learn-banner-badges">
            <span className="learn-banner-badge">無料</span>
            <span className="learn-banner-badge site"><i className="ph-fill ph-house" /> サイト内</span>
          </div>
          <h3 className="learn-banner-image-headline">推し活で使える韓国語</h3>
          <p className="learn-banner-image-sub">
            クイズ付きで、ハングルの読み方から推しへのファンレターまで。<br />
            LaLaLaKorea内の無料コンテンツです。
          </p>
          <span className="learn-banner-cta">
            はじめる <i className="ph ph-arrow-right" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/learn" className="learn-banner" onClick={handleClick}>
      <span className="learn-banner-icon"><i className="ph-fill ph-graduation-cap" /></span>
      <span className="learn-banner-text">
        <span className="learn-banner-headline">
          <span className="learn-banner-badge">無料</span>
          <span className="learn-banner-badge site"><i className="ph-fill ph-house" /> サイト内</span>
          推し活で使える韓国語、クイズ付きで学べます
        </span>
        <span className="learn-banner-sub">ハングルの読み方から、推しへのファンレターまで（LaLaLaKorea内のコンテンツです）</span>
      </span>
      <span className="learn-banner-cta">
        はじめる <i className="ph ph-arrow-right" />
      </span>
    </Link>
  );
}
