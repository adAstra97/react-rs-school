import { render, screen, fireEvent } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { vi } from 'vitest';
import { Flyout } from '../components/Flyout/Flyout';
import { clearSelectedCharacters } from '../redux/slices/selectedCharactersSlice';
import { generateCsvContent } from '../utils/csv-export';
import { createMockRouter } from '../utils/test-helper';
import { mockCharacters } from '../shared/mocks/characters';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Character } from '../shared/types/character.interface';
import { RootState } from '../redux';

const mockCard = mockCharacters[0] as Character;

vi.mock('../redux/hooks.ts', () => ({
  useAppSelector: vi.fn((selector) =>
    selector({
      selectedCharacters: [mockCard],
      charactersApi: {},
    } as RootState)
  ),
  useAppDispatch: vi.fn(() => vi.fn()),
}));

vi.mock('../utils/csv-export', () => ({
  generateCsvContent: vi.fn().mockReturnValue('mock,csv,content'),
  downloadCsvFile: vi.fn(),
}));

describe('Flyout component', () => {
  let mockRouter: ReturnType<typeof createMockRouter>;
  const mockDispatch = vi.fn();

  beforeEach(() => {
    mockRouter = createMockRouter({
      query: { detailsId: String(mockCard.id) },
    });

    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockImplementation((selector) =>
      selector({
        selectedCharacters: [mockCard],
        charactersApi: {},
      } as RootState)
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with selected characters', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Flyout />
      </RouterContext.Provider>
    );

    expect(screen.getByText('item are selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('should dispatch clear action when "Unselect all" is clicked', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Flyout />
      </RouterContext.Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));
    expect(mockDispatch).toHaveBeenCalledWith(clearSelectedCharacters());
  });

  it('should call CSV download functions when "Download" is clicked', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Flyout />
      </RouterContext.Provider>
    );

    fireEvent.click(screen.getByText('Download'));

    expect(generateCsvContent).toHaveBeenCalledWith([mockCard]);
  });
});
