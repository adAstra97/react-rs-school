import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router';
import { MainPage } from '../pages';
import { useGetCharactersQuery } from '../redux/charactersApi';
import { store } from '../redux';
import { Provider } from 'react-redux';

vi.mock('../redux/charactersApi', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../redux/charactersApi')>();
  return {
    ...mod,
    useGetCharactersQuery: vi.fn(),
  };
});

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    search: '?query=rick&page=2',
  }),
}));

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
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('There is nothing here :(')).toBeInTheDocument();
    });
  });
});
