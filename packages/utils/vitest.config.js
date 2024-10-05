import { defineConfig } from 'vitest/config';
import vitestConfig from '@repo/vitest-config';

export default defineConfig({
  ...vitestConfig,
  test: {
    ...vitestConfig.test,
    coverage: {
      provider: 'v8',
      enabled: !process.env.CI,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    },
  },
});
