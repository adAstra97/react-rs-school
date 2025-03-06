import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { vi } from 'vitest';
import { addSelectedCharacter } from '../redux/slices/selectedCharactersSlice';
import { Character } from '../shared/types/character.interface';
import { mockCharacters } from '../shared/mocks/characters';
import { makeStore } from '../redux';
import { SearchCard } from '../components';

const mockCard = mockCharacters[0] as Character;

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe('SearchCard', () => {
  let store: ReturnType<typeof makeStore>;
  const mockPush = vi.fn();

  beforeEach(() => {
    store = makeStore();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => new URLSearchParams('page=1&query=Rick').get(key),
      toString: () => 'page=1&query=Rick',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render card data', () => {
    render(
      <Provider store={store}>
        <SearchCard card={mockCard} />
      </Provider>
    );

    expect(screen.getByText(mockCard.name)).toBeInTheDocument();
    expect(screen.getByText(mockCard.species)).toBeInTheDocument();
  });

  it('should navigate to the detailed card component when clicked', async () => {
    const mockSearchParams = new URLSearchParams('page=1&query=Rick');

    (useSearchParams as jest.Mock).mockImplementation(() => mockSearchParams);

    render(
      <Provider store={store}>
        <SearchCard card={mockCard} />
      </Provider>
    );

    const cardButton = screen.getByRole('button');
    fireEvent.click(cardButton);

    await waitFor(() => {
      const expectedParams = new URLSearchParams(mockSearchParams);
      expectedParams.set('detailsId', mockCard.id.toString());

      expect(mockPush).toHaveBeenCalledWith(`/?${expectedParams.toString()}`);
    });
  });

  it('should reflect selection state from store', () => {
    store.dispatch(addSelectedCharacter(mockCard));

    render(
      <Provider store={store}>
        <SearchCard card={mockCard} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});
