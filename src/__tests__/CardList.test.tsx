import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { CardList } from '../components';
import { mockCharacters } from '../shared/mocks/characters';
import { makeStore } from '../redux';

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

describe('CardList Component', () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    store = makeStore();

    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => new URLSearchParams('page=1&query=Rick').get(key),
      toString: () => 'page=1&query=Rick',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correct number of cards', () => {
    render(
      <Provider store={store}>
        <CardList items={mockCharacters} />
      </Provider>
    );

    const cards = screen.getAllByTestId('search-card');
    expect(cards).toHaveLength(mockCharacters.length);

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
      expect(screen.getByAltText(character.name)).toBeInTheDocument();
    });
  });
});
