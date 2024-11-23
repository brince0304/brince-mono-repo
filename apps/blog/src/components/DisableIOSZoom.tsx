'use client';

import { useEffect } from 'react';

export function DisableIOSZoom() {
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      navigator.platform === 'MacIntel' &&
      navigator.maxTouchPoints > 1;

    if (!isIOS) return;

    const viewport = document.querySelector('meta[name=viewport]');
    if (!viewport) return;

    let content = viewport.getAttribute('content') || '';
    const re = /maximum\-scale=[0-9\.]+/g;

    if (re.test(content)) {
      content = content.replace(re, 'maximum-scale=1.0');
    } else {
      content = [content, 'maximum-scale=1.0'].join(', ');
    }

    viewport.setAttribute('content', content);
  }, []);

  return null;
}
