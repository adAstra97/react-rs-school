import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { vi } from 'vitest';
import { DetailsPage } from '../pages';
import { useGetCharacterQuery } from '../redux/charactersApi';
import { mockCharacters } from '../shared/mocks/characters';

const mockCard = mockCharacters[0];

vi.mock('../redux/charactersApi.ts', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../redux/charactersApi')>();
  return {
    ...mod,
    useGetCharacterQuery: vi.fn(),
  };
});

describe('DetailsPage', () => {
  it('should show a loading indicator while fetching data', async () => {
    const mock = useGetCharacterQuery as jest.Mock;

    mock.mockReturnValue({
      data: undefined,
      isFetching: true,
    });

    const { rerender } = render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    mock.mockReturnValue({
      data: mockCard,
      isFetching: false,
    });

    rerender(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).toBeNull();
    });
  });

  it('should display character details when data is loaded', async () => {
    (useGetCharacterQuery as jest.Mock).mockReturnValue({
      data: mockCard,
      isFetching: false,
    });

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
  });
});
