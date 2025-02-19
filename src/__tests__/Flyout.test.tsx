import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { Flyout } from '../components/Flyout/Flyout';
import { clearSelectedCharacters } from '../redux/slices/selectedCharactersSlice';
import { downloadCsvFile, generateCsvContent } from '../utils/csv-export';
import { RootState, store } from '../redux/store';
import { mockCharacters } from '../shared/mocks/characters';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const mockCard = mockCharacters[0];

vi.mock('../redux/hooks.ts', () => ({
  useAppSelector: vi.fn((selector: (state: RootState) => unknown) =>
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
  const mockDispatch = vi.fn();

  beforeEach(() => {
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
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('item are selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('should dispatch clear action when unselect all clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));
    expect(mockDispatch).toHaveBeenCalledWith(clearSelectedCharacters());
  });

  it('should call CSV download functions when download clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Download'));

    expect(generateCsvContent).toHaveBeenCalledWith([mockCard]);
    expect(downloadCsvFile).toHaveBeenCalledWith(
      'mock,csv,content',
      '1_characters.csv',
      expect.any(HTMLAnchorElement)
    );
  });
});
