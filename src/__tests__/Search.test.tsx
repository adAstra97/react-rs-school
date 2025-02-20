import {
  render,
  screen,
  fireEvent,
  waitFor,
  renderHook,
} from '@testing-library/react';
import { describe, beforeEach, vi } from 'vitest';
import { MainPage } from '../pages';
import { MemoryRouter, useSearchParams } from 'react-router';
import { useLocalStorage } from '../hooks/use-local-storage';
import { Provider } from 'react-redux';
import { store, useGetCharactersQuery } from '../redux';

vi.mock('../redux/charactersApi', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../redux/charactersApi')>();
  return {
    ...mod,
    useGetCharactersQuery: vi.fn(),
  };
});

let mockSearchParams = new URLSearchParams();
const setSearchParamsMock = vi.fn((params: Record<string, string>) => {
  mockSearchParams = new URLSearchParams(params);
});

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useSearchParams: vi.fn(() => [mockSearchParams, setSearchParamsMock]),
  };
});

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  it('should save trimmed query to localStorage on search button click', async () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: { results: [], info: { pages: 1 } },
      isFetching: false,
      error: undefined,
      isError: false,
    });

    let testSearchParams = new URLSearchParams();
    const setSearchParams = vi.fn((params) => {
      testSearchParams = new URLSearchParams(params);
      rerender(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <MainPage />
          </MemoryRouter>
        </Provider>
      );
    });

    vi.mocked(useSearchParams).mockImplementation(() => [
      testSearchParams,
      setSearchParams,
    ]);

    const { rerender } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: '  rick  ' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('search-query')).toBe('rick');

      expect(testSearchParams.get('query')).toBe('rick');
      expect(testSearchParams.get('page')).toBe('1');
    });
  });

  it('should load query from localStorage', async () => {
    const testQuery = 'rick';
    const setSearchParamsMock = vi.fn();

    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ query: testQuery, page: '1' }),
      setSearchParamsMock,
    ]);

    localStorage.setItem('search-query', testQuery);

    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: { results: [{ id: 1, name: 'Rick Sanchez' }], info: { pages: 1 } },
      isFetching: false,
      isError: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveValue(testQuery);
    expect(useGetCharactersQuery).toHaveBeenCalledWith({
      name: testQuery,
      page: 1,
    });

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });
});

describe('useLocalStorage', () => {
  it('should load saved value', () => {
    localStorage.setItem('test-key', 'test-value');
    const { result } = renderHook(() => useLocalStorage('test-key'));
    expect(result.current.value).toBe('test-value');
  });
});
