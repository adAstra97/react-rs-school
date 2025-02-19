import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { SearchCard } from '../components';
import { mockCharacters } from '../shared/mocks/characters';
import { Provider } from 'react-redux';
import { store } from '../redux';
import { vi } from 'vitest';
import { addSelectedCharacter } from '../redux/slices/selectedCharactersSlice';

const mockCard = mockCharacters[0];

vi.mock('../redux/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../redux/hooks')>();
  return {
    ...actual,
    useAppDispatch: () => vi.fn(),
    useAppSelector: vi.fn((fn) => fn(store.getState())),
  };
});

describe('Card', () => {
  it('should render card data', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchCard card={mockCard} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(mockCard.name)).toBeInTheDocument();

    const imgElement = screen.getByRole('img');

    expect(imgElement).toHaveAttribute('src', mockCard.image);
    expect(imgElement).toHaveAttribute('alt', mockCard.name);
    expect(screen.getByText(mockCard.species)).toBeInTheDocument();
  });

  it('should navigate to the detailed card component when clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchCard card={mockCard} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('link'));

    expect(window.location.pathname).toBe(`/details/${mockCard.id}`);
  });

  it('should reflect selection state from store', () => {
    store.dispatch(addSelectedCharacter(mockCard));

    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchCard card={mockCard} />
        </BrowserRouter>
      </Provider>
    );

    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});
