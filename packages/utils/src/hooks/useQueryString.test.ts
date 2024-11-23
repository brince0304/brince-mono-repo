import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import useQueryString from '@/hooks/useQueryString';
import { useSearchParams, type ReadonlyURLSearchParams } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

describe('useQueryString', () => {
  const mockSearchParams = new URLSearchParams('');

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams.delete('key1');
    mockSearchParams.delete('key2');
    vi.mocked(useSearchParams).mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams
    );
  });

  it('지정된 키에 대한 쿼리 파라미터를 반환합니다', () => {
    mockSearchParams.set('key1', 'value1');
    mockSearchParams.set('key2', 'value2');

    const { result } = renderHook(() => useQueryString(['key1', 'key2']));

    expect(result.current).toEqual({
      key1: 'value1',
      key2: 'value2',
    });
  });

  it('존재하지 않는 키는 결과에서 제외됩니다', () => {
    mockSearchParams.set('key2', 'value2');

    const { result } = renderHook(() => useQueryString(['key1', 'key2']));

    expect(result.current).toEqual({
      key2: 'value2',
    });
  });

  it('쿼리 파라미터가 없을 때 빈 객체를 반환합니다', () => {
    const { result } = renderHook(() => useQueryString(['key1', 'key2']));

    expect(result.current).toEqual({});
  });
});
