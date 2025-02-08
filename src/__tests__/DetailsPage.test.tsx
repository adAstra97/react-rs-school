import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { vi } from 'vitest';
import { DetailsPage } from '../pages';
import { CharacterService } from '../services/character.service';
import { DetailedCharacterCard } from '../shared/types/types';

const mockCard: DetailedCharacterCard = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  species: 'Human',
  location: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  origin: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
};

vi.mock('../services/character.service', () => ({
  CharacterService: {
    getCharacter: vi.fn(),
  },
}));

describe('DetailsPage', () => {
  it('should show a loading indicator while fetching data', async () => {
    (CharacterService.getCharacter as jest.Mock).mockResolvedValue({
      data: mockCard,
    });

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByTestId('spinner')).toBeNull());
  });
});
