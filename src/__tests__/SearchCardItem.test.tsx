import { fireEvent, render, screen } from '@testing-library/react';
import { SearchCard } from '../components';
import { CharacterCard } from '../shared/types/types';
import { BrowserRouter } from 'react-router';

const mockCard: CharacterCard = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  species: 'Human',
};

describe('Card', () => {
  it('should render card data', () => {
    render(
      <BrowserRouter>
        <SearchCard card={mockCard} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockCard.name)).toBeInTheDocument();

    const imgElement = screen.getByRole('img');

    expect(imgElement).toHaveAttribute('src', mockCard.image);
    expect(imgElement).toHaveAttribute('alt', mockCard.name);
    expect(screen.getByText(mockCard.species)).toBeInTheDocument();
  });

  it('should navigate to the detailed card component when clicked', () => {
    render(
      <BrowserRouter>
        <SearchCard card={mockCard} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('link'));

    expect(window.location.pathname).toBe(`/details/${mockCard.id}`);
  });

  it('should navigate to the detailed card component when clicked', () => {
    render(
      <BrowserRouter>
        <SearchCard card={mockCard} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('link'));

    expect(window.location.pathname).toBe(`/details/${mockCard.id}`);
  });
});
