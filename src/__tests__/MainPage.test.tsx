import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import MainPage from '../pages/index';
import { useGetCharactersQuery } from '../redux/charactersApi';
import { makeStore } from '../redux';
import { createMockRouter } from '../utils/test-helper';

vi.mock('../redux/charactersApi', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../redux/charactersApi')>();
  return {
    ...mod,
    useGetCharactersQuery: vi.fn(),
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
    const mockedRouter = createMockRouter({
      query: { query: 'rick', page: '2' },
    });

    const store = makeStore();

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <RouterContext.Provider value={mockedRouter}>
        <Provider store={store}>{children}</Provider>
      </RouterContext.Provider>
    );

    render(<MainPage searchQuery="rickkk" currentPage={2} />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(screen.getByText('There is nothing here :(')).toBeInTheDocument();
    });
  });
});
