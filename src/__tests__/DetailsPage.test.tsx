import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { makeStore } from '../redux';
import { DetailsPanel } from '../components';
import { mockCharacters } from '../shared/mocks/characters';
import { Character } from '../shared/types/character.interface';

const mockCard = mockCharacters[0] as Character;

vi.mock('../services/character.service', () => ({
  CharacterService: {
    getCharacter: vi.fn(),
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
  useSearchParams: () => new URLSearchParams('query=&page=1&detailsId=1'),
}));

describe('DetailsPanel', () => {
  it('should show a loading indicator while fetching data', async () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <DetailsPanel character={mockCard} />
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should display character details when data is loaded', async () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <DetailsPanel character={mockCard} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockCard.name)).toBeInTheDocument();
      expect(screen.getByAltText(mockCard.name)).toBeInTheDocument();
    });
  });

  it('should display error message if there is an error fetching character data', async () => {
    const mockErrorCard = {
      ...mockCard,
      error: 'No such character',
    };

    const store = makeStore();
    render(
      <Provider store={store}>
        <DetailsPanel character={mockErrorCard} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('No such character :(')).toBeInTheDocument();
    });
  });
});
