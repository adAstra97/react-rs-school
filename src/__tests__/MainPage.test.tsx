import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { makeStore } from '../redux';
import MainPage from '../app/page';

vi.mock('../services/character.service', () => ({
  CharacterService: {
    getAllCharacters: vi.fn().mockResolvedValue({
      error: 'There is nothing here',
    }),
  },
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams('query=12345&page=1'),
}));

describe('MainPage', () => {
  it('should display error message if no cards are present', async () => {
    const store = makeStore();

    const props = {
      searchParams: Promise.resolve({ query: '12345', page: '1' }),
    };
    const Result = await MainPage(props);
    render(<Provider store={store}>{Result}</Provider>);

    await waitFor(() => {
      expect(screen.getByText('There is nothing here :(')).toBeInTheDocument();
    });
  });
});
