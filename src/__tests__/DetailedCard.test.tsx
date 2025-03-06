import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { DetailedCard } from '../components';
import { mockCharacters } from '../shared/mocks/characters';
import { makeStore } from '../redux';
import { Character } from '../shared/types/character.interface';

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

describe('DetailedCard Component', () => {
  let store: ReturnType<typeof makeStore>;
  const mockPush = vi.fn();

  beforeEach(() => {
    store = makeStore();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params = new URLSearchParams('page=1&query=Rick&detailsId=1');
        return params.get(key);
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render detailed card data correctly', () => {
    render(
      <Provider store={store}>
        <DetailedCard character={mockCard} />
      </Provider>
    );

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
    const mockGet = vi.fn((key: string) =>
      new URLSearchParams('page=1&query=Rick&detailsId=1').get(key)
    );

    const mockToString = vi.fn(() => 'page=1&query=Rick&detailsId=1');

    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet,
      toString: mockToString,
    });

    render(
      <Provider store={store}>
        <DetailedCard character={mockCard} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('close-button'));

    expect(mockPush).toHaveBeenCalledWith('/?page=1&query=Rick');
  });
});
