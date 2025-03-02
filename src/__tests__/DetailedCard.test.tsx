import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';
import { DetailedCard } from '../components';
import { mockCharacters } from '../shared/mocks/characters';
import { makeStore } from '../redux';
import { createMockRouter } from '../utils/test-helper';
import { Character } from '../shared/types/character.interface';

const mockCard = mockCharacters[0] as Character;

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

describe('DetailedCard Component', () => {
  let mockedRouter: ReturnType<typeof createMockRouter>;
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    mockedRouter = createMockRouter({
      query: { page: '1', query: 'Rick', detailsId: '1' },
    });
    store = makeStore();
  });

  it('should render detailed card data correctly', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <RouterContext.Provider value={mockedRouter}>
        <Provider store={store}>{children}</Provider>
      </RouterContext.Provider>
    );

    render(<DetailedCard character={mockCard} />, { wrapper: Wrapper });

    expect(screen.getByText(mockCard.name)).toBeInTheDocument();
    expect(screen.getByText(mockCard.species)).toBeInTheDocument();
    expect(screen.getByAltText(mockCard.name)).toHaveAttribute(
      'src',
      mockCard.image
    );

    const locationElement = screen
      .getByText('Last known location:')
      .closest('div');
    expect(locationElement).not.toBeNull();
    expect(
      within(locationElement as HTMLElement).getByText(mockCard.location.name)
    ).toBeInTheDocument();

    const originElement = screen.getByText('First seen in:').closest('div');
    expect(originElement).not.toBeNull();
    expect(
      within(originElement as HTMLElement).getByText(mockCard.origin.name)
    ).toBeInTheDocument();
  });

  it('should close the component when clicking the close button', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <RouterContext.Provider value={mockedRouter}>
        <Provider store={store}>{children}</Provider>
      </RouterContext.Provider>
    );

    render(<DetailedCard character={mockCard} />, { wrapper: Wrapper });

    fireEvent.click(screen.getByTestId('close-button'));

    expect(mockedRouter.push).toHaveBeenCalledWith(
      {
        pathname: mockedRouter.pathname,
        query: { page: '1', query: 'Rick' },
      },
      undefined,
      { shallow: true }
    );
  });
});
