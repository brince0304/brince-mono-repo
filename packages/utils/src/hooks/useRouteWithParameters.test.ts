import { renderHook } from '@testing-library/react-hooks';
import {
  useRouter,
  usePathname,
  useSearchParams,
  type ReadonlyURLSearchParams,
} from 'next/navigation';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useRouteWithParameters from './useRouteWithParameters';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('useRouteWithParameters', () => {
  const mockPush = vi.fn();
  const mockReplace = vi.fn();
  const mockSearchParams = new URLSearchParams('');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    } as unknown as AppRouterInstance);
    vi.mocked(usePathname).mockReturnValue('/test');
    vi.mocked(useSearchParams).mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams
    );
  });

  it('파라미터를 추가하고 라우트를 푸시합니다', () => {
    const { result } = renderHook(() => useRouteWithParameters());

    result.current({ parameters: { key: 'value' } });

    expect(mockPush).toHaveBeenCalledWith('/test?key=value');
  });

  it('replace가 true일 때 라우트를 교체합니다', () => {
    const { result } = renderHook(() => useRouteWithParameters());

    result.current({ parameters: { key: 'value' }, replace: true });

    expect(mockReplace).toHaveBeenCalledWith('/test?key=value');
  });

  it('clear가 false일 때 불필요한 파라미터를 제거합니다', () => {
    const { result } = renderHook(() => useRouteWithParameters());

    result.current({ parameters: { newKey: 'newValue' } });

    expect(mockPush).toHaveBeenCalledWith('/test?newKey=newValue');
  });

  it('clear가 false일 때 불필요한 파라미터를 제거합니다', () => {
    mockSearchParams.append('oldKey', 'oldValue');
    const { result } = renderHook(() => useRouteWithParameters());

    result.current({ parameters: { newKey: 'newValue' } });

    expect(mockPush).toHaveBeenCalledWith('/test?newKey=newValue');
  });

  it('baseUrl이 없을 때 현재 경로 사용', () => {
    const { result } = renderHook(() => useRouteWithParameters());

    result.current({ parameters: { key: 'value' } });

    expect(mockPush).toHaveBeenCalledWith('/test?key=value');
  });
});
