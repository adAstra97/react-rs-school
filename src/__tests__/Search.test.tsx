import {
  render,
  screen,
  fireEvent,
  waitFor,
  renderHook,
} from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import MainPage from '../page-last';
import { useGetCharactersQuery } from '../redux/charactersApi';
import { createMockRouter } from '../utils/test-helper';
import { makeStore } from '../redux';
import { useLocalStorage } from '../hooks/use-local-storage';

vi.mock('../redux/charactersApi', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../redux/charactersApi')>();
  return {
    ...mod,
    useGetCharactersQuery: vi.fn(),
  };
});

vi.mock('../hooks/use-local-storage', () => {
  const actual = vi.importActual('../hooks/use-local-storage');
  return actual;
});

describe('Search component', () => {
  let mockedRouter: ReturnType<typeof createMockRouter>;
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mockedRouter = createMockRouter({
      query: {},
    });
    store = makeStore();
  });

  it('should save trimmed query to localStorage on search button click', async () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: { results: [], info: { pages: 1 } },
      isFetching: false,
      error: undefined,
      isError: false,
    });

    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockedRouter}>
          <MainPage searchQuery="" currentPage={1} />
        </RouterContext.Provider>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: '  rick  ' } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(localStorage.getItem('search-query')).toBe('rick')
    );
  });

  it('should load query from localStorage', async () => {
    const testQuery = 'rick';

    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: { results: [{ id: 1, name: 'Rick Sanchez' }], info: { pages: 1 } },
      isFetching: false,
      error: undefined,
      isError: false,
    });

    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockedRouter}>
          <MainPage searchQuery={testQuery} currentPage={1} />
        </RouterContext.Provider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveValue(testQuery);
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
