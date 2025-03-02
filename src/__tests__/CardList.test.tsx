import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';
import { mockCharacters } from '../shared/mocks/characters';
import { CardList } from '../components';
import { makeStore } from '../redux';
import { createMockRouter } from '../utils/test-helper';

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
  let mockedRouter: ReturnType<typeof createMockRouter>;
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    mockedRouter = createMockRouter({
      query: { page: '1', query: 'Rick' },
    });
    store = makeStore();
  });

  it('should render correct number of cards', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <RouterContext.Provider value={mockedRouter}>
        <Provider store={store}>{children}</Provider>
      </RouterContext.Provider>
    );

    render(<CardList items={mockCharacters} />, { wrapper: Wrapper });

    const cards = screen.getAllByTestId('search-card');
    expect(cards).toHaveLength(mockCharacters.length);

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
      expect(screen.getByAltText(character.name)).toBeInTheDocument();
    });
  });
});
