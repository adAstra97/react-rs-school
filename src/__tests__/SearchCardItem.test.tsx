import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { addSelectedCharacter } from '../redux/slices/selectedCharactersSlice';
import { Character } from '../shared/types/character.interface';
import { mockCharacters } from '../shared/mocks/characters';
import { makeStore } from '../redux';
import { createMockRouter } from '../utils/test-helper';
import { SearchCard } from '../components';

const mockCard = mockCharacters[0] as Character;

describe('SearchCard', () => {
  let mockedRouter: ReturnType<typeof createMockRouter>;
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    mockedRouter = createMockRouter({
      query: { page: '1', query: 'Rick' },
    });
    store = makeStore();
  });

  it('should render card data', () => {
    render(
      <RouterContext.Provider value={mockedRouter}>
        <Provider store={store}>
          <SearchCard card={mockCard} />
        </Provider>
      </RouterContext.Provider>
    );

    expect(screen.getByText(mockCard.name)).toBeInTheDocument();

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src');
    expect(imgElement.getAttribute('src')).toContain(
      encodeURIComponent(mockCard.image)
    );

    expect(imgElement).toHaveAttribute('alt', mockCard.name);
    expect(screen.getByText(mockCard.species)).toBeInTheDocument();
  });

  it('should navigate to the detailed card component when clicked', async () => {
    render(
      <RouterContext.Provider value={mockedRouter}>
        <Provider store={store}>
          <SearchCard card={mockCard} />
        </Provider>
      </RouterContext.Provider>
    );

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockedRouter.push).toHaveBeenCalledWith({
        query: { page: '1', query: 'Rick', detailsId: mockCard.id },
      });
    });
  });

  it('should reflect selection state from store', () => {
    store.dispatch(addSelectedCharacter(mockCard));

    render(
      <RouterContext.Provider value={mockedRouter}>
        <Provider store={store}>
          <SearchCard card={mockCard} />
        </Provider>
      </RouterContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});
