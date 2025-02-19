import { render, screen, fireEvent, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { DetailedCard } from '../components';
import { mockCharacters } from '../shared/mocks/characters';

const mockCard = mockCharacters[0];

describe('DetailedCard', () => {
  it('should render detailed card data correctly', () => {
    render(
      <BrowserRouter>
        <DetailedCard character={mockCard} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockCard.name)).toBeInTheDocument();
    expect(screen.getByText(mockCard.species)).toBeInTheDocument();
    expect(screen.getByAltText(mockCard.name)).toHaveAttribute(
      'src',
      mockCard.image
    );

    const locationElement = screen
      .getByText('Last known location:')
      ?.closest('div');
    expect(locationElement).not.toBeNull();
    expect(
      within(locationElement as HTMLElement).getByText(mockCard.location.name)
    ).toBeInTheDocument();

    const originElement = screen.getByText('First seen in:')?.closest('div');
    expect(originElement).not.toBeNull();
    expect(
      within(originElement as HTMLElement).getByText(mockCard.origin.name)
    ).toBeInTheDocument();
  });

  it('should close the component when clicking the close button', () => {
    render(
      <BrowserRouter>
        <DetailedCard character={mockCard} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('link'));

    expect(window.location.pathname).toBe('/');
    expect(window.location.search).toBe(location.search);
  });
});
