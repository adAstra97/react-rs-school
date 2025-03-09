import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLocalStorage } from '../hooks/use-local-storage';
import { ThemeProvider } from '../providers/ThemeProvider';
import {
  useTheme,
  useThemeUpdate,
} from '../providers/ThemeProvider/ThemeContext';

vi.mock('../hooks/use-local-storage.tsx');

describe('ThemeProvider', () => {
  const mockSetValue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLocalStorage as jest.Mock).mockReturnValue({
      value: 'light',
      setValue: mockSetValue,
    });
  });

  it('should initialize with light theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current).toBe('light');
  });

  it('should toggle theme', () => {
    let currentTheme = 'dark';

    mockSetValue.mockImplementation((newValue) => {
      if (typeof newValue === 'function') {
        currentTheme = newValue(currentTheme);
      } else {
        currentTheme = newValue;
      }
    });

    const { result } = renderHook(
      () => ({
        theme: useTheme(),
        toggle: useThemeUpdate(),
      }),
      {
        wrapper: ThemeProvider,
      }
    );

    act(() => result.current.toggle());
    expect(currentTheme).toBe('light');

    act(() => result.current.toggle());
    expect(currentTheme).toBe('dark');
  });

  it('should save to localStorage', () => {
    renderHook(() => useThemeUpdate(), {
      wrapper: ThemeProvider,
    }).result.current();

    expect(useLocalStorage).toHaveBeenCalledWith('theme', 'light');
    expect(mockSetValue).toHaveBeenCalled();
  });

  it('should initialize with value from localStorage', () => {
    (useLocalStorage as jest.Mock).mockReturnValue({
      value: 'light',
      setValue: vi.fn(),
    });

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current).toBe('light');
  });
});
