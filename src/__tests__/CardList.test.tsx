import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { CardList } from '../components';
import { CharacterCard } from '../shared/types/types';

const mockCards: CharacterCard[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    species: 'Human',
  },
  {
    id: 2,
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    species: 'Human',
  },
];

describe('CardList', () => {
  it('should render correct number of cards', () => {
    render(
      <BrowserRouter>
        <CardList items={mockCards} />
      </BrowserRouter>
    );
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockCards.length);
  });
});
