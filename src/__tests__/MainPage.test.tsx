import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter, useSearchParams } from 'react-router';
import { useGetCharactersQuery } from '../redux/charactersApi';
import { store } from '../redux';
import { Provider } from 'react-redux';
import MainPage from '../pages/MainPage';

vi.mock('../redux/charactersApi', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../redux/charactersApi')>();
  return {
    ...mod,
    useGetCharactersQuery: vi.fn(),
  };
});

const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    search: '?query=rick&page=2',
  }),
}));

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useSearchParams: vi.fn(),
    useNavigation: vi.fn(),
  };
});

describe('MainPage', () => {
  beforeEach(() => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { data: { error: 'There is nothing here' } },
      isFetching: false,
      isError: true,
    });
  });

  it('should display error message if no cards are present', async () => {
    const mockLoader = {
      searchQuery: '',
      currentPage: 1,
      error: {
        data: { error: 'There is nothing here' },
      },
    };

    const setSearchParamsMock = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      setSearchParamsMock,
    ]);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage loaderData={mockLoader} />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('There is nothing here :(')).toBeInTheDocument();
    });
  });
});
