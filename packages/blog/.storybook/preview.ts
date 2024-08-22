import '../src/app/globals.css'; // 또는 프로젝트의 글로벌 CSS 파일 경로

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
