import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';

// RTL matchers 확장
expect.extend(matchers);

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    promise: vi.fn(),
  },
}));

beforeAll(() => {
  vi.clearAllMocks();
});

// 각 테스트 후 cleanup
afterEach(() => {
  cleanup();
});

// React 18 설정
global.React = require('react'); 
