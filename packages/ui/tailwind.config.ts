const sharedConfig = require('@repo/tailwind');
import type { Config } from 'tailwindcss';

const config: Config = {
  ...sharedConfig,
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    ...sharedConfig.theme,
  },
};

export default config;
