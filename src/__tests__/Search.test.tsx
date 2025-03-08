import {
  render,
  screen,
  fireEvent,
  waitFor,
  renderHook,
} from '@testing-library/react';
import { describe, beforeEach, vi } from 'vitest';
import { MemoryRouter, useSearchParams } from 'react-router';
import { useLocalStorage } from '../hooks/use-local-storage';
import { Provider } from 'react-redux';
import { store, useGetCharactersQuery } from '../redux';
import MainPage from '../pages/MainPage';
import { CharacterGender, CharacterStatus } from '../shared/types/types';

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

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useSearchParams: vi.fn(),
    useNavigation: vi.fn(),
  };
});

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should save trimmed query to localStorage on search button click', async () => {
    const setSearchParamsMock = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      setSearchParamsMock,
    ]);

    const mockLoader = {
      charactersData: {
        info: {
          count: 1,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [],
      },
      searchQuery: '',
      currentPage: 1,
      error: null,
    };

    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: {
        results: [],
        info: { pages: 1 },
      },
      isFetching: false,
      error: undefined,
      isError: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <MainPage loaderData={mockLoader} />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: '  rick  ' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('search-query')).toBe('rick');
    });
  });

  it('should load query from localStorage', async () => {
    const testQuery = 'rick';
    const mockLoader = {
      charactersData: {
        info: {
          count: 1,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive' as CharacterStatus,
            species: 'Human',
            type: '',
            gender: 'Male' as CharacterGender,
            origin: { name: '', url: '' },
            location: { name: '', url: '' },
            image: '',
            episode: [],
            url: '',
            created: '',
          },
        ],
      },
      searchQuery: testQuery,
      currentPage: 1,
    };

    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: { results: [{ id: 1, name: 'Rick Sanchez' }], info: { pages: 1 } },
      isFetching: false,
      isError: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage loaderData={mockLoader} />
        </MemoryRouter>
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
