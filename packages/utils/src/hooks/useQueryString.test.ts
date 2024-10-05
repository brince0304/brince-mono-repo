import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import useQueryString from '@/hooks/useQueryString';
import * as nextNavigation from 'next/navigation';
import * as nextFn from '@/lib/next';

vi.mock('next/navigation');
vi.mock('@/lib/next');

describe('useQueryString', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('서버에서 실행될 때 usePathname을 사용해야 합니다', () => {
    vi.mocked(nextFn.isServer).mockReturnValue(true);
    vi.mocked(nextNavigation.usePathname).mockReturnValue('/test?key1=value1&key2=value2');

    const { result } = renderHook(() => useQueryString(['key1', 'key2']));

    expect(result.current).toEqual({ key1: 'value1', key2: 'value2' });
    expect(nextNavigation.usePathname).toHaveBeenCalled();
  });

  it('클라이언트에서 실행될 때 window.location.pathname을 사용해야 합니다', () => {
    vi.mocked(nextFn.isServer).mockReturnValue(false);
    Object.defineProperty(window, 'location', {
      value: { pathname: '/test?key1=value1&key2=value2' },
      writable: true,
    });

    const { result } = renderHook(() => useQueryString(['key1', 'key2']));

    expect(result.current).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('쿼리 파라미터가 없을 때 빈 객체를 반환해야 합니다', () => {
    vi.mocked(nextFn.isServer).mockReturnValue(true);
    vi.mocked(nextNavigation.usePathname).mockReturnValue('/test');

    const { result } = renderHook(() => useQueryString(['key1', 'key2']));

    expect(result.current).toEqual({});
  });

  it('존재하지 않는 키에 대해 undefined를 반환해야 합니다', () => {
    vi.mocked(nextFn.isServer).mockReturnValue(true);
    vi.mocked(nextNavigation.usePathname).mockReturnValue('/test?key2=value2');

    const { result } = renderHook(() => useQueryString(['key1']));

    const { key1 } = result.current;
    expect(key1).toBeUndefined();
  });
});
