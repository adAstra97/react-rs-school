import { render, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { vi } from 'vitest';
import { useGetCharacterQuery } from '../redux';
import { mockCharacters } from '../shared/mocks/characters';
import { createMockRouter } from '../utils/test-helper';
import { Character } from '../shared/types/character.interface';
import DetailsPanel from '../components/DetailsPanel/DetailsPanel';

const mockCard = mockCharacters[0] as Character;

vi.mock('../redux/charactersApi', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../redux/charactersApi')>();
  return {
    ...mod,
    useGetCharacterQuery: vi.fn(),
  };
});

describe('DetailsPanel', () => {
  let mockRouter: ReturnType<typeof createMockRouter>;

  beforeEach(() => {
    mockRouter = createMockRouter({
      query: { detailsId: String(mockCard.id) },
    });
  });

  it('should show a loading indicator while fetching data', async () => {
    const mock = useGetCharacterQuery as jest.Mock;

    mock.mockReturnValue({
      data: undefined,
      isFetching: true,
    });

    const { rerender } = render(
      <RouterContext.Provider value={mockRouter}>
        <DetailsPanel />
      </RouterContext.Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    mock.mockReturnValue({
      data: mockCard,
      isFetching: false,
    });

    rerender(
      <RouterContext.Provider value={mockRouter}>
        <DetailsPanel />
      </RouterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  it('should display character details when data is loaded', async () => {
    (useGetCharacterQuery as jest.Mock).mockReturnValue({
      data: mockCard,
      isFetching: false,
    });

    render(
      <RouterContext.Provider value={mockRouter}>
        <DetailsPanel />
      </RouterContext.Provider>
    );

    expect(screen.getByText(mockCard.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockCard.name)).toBeInTheDocument();
  });
});
