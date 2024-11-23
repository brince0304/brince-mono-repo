import localFont from 'next/font/local';

export const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  weight: '45 920',
  display: 'swap',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
  preload: true,
  variable: '--font-pretendard',
});
