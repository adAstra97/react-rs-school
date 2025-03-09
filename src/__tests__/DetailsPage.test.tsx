import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDetailsLoading } from '../hooks/use-details-loading';

describe('useDetailsLoading hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it('should not set loading when trigger is null', () => {
    const { result } = renderHook(() => useDetailsLoading(null));
    expect(result.current).toBe(false);
  });

  it('should cleanup timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const { unmount } = renderHook(() => useDetailsLoading('test'));

    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });
});
