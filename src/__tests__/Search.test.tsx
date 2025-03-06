import {
  render,
  screen,
  fireEvent,
  waitFor,
  renderHook,
} from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { CharacterService } from '../services/character.service';
import { makeStore } from '../redux';
import { useLocalStorage } from '../hooks/use-local-storage';
import MainPage from '../app/page';

vi.mock('../services/character.service', () => ({
  CharacterService: {
    getAllCharacters: vi.fn(),
    getCharacter: vi.fn(),
  },
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
  })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

const mockSetItem = vi.fn();
const mockGetItem = vi.fn();

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: mockSetItem,
      getItem: mockGetItem,
      clear: vi.fn(),
    },
    writable: true,
  });
});

describe('Search component', () => {
  let store: ReturnType<typeof makeStore>;
  const mockPush = vi.fn();

  beforeEach(() => {
    store = makeStore();
    vi.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockImplementation(
      () => new URLSearchParams()
    );
  });

  it('should save trimmed query to localStorage on search button click', async () => {
    (CharacterService.getAllCharacters as jest.Mock).mockResolvedValue({
      results: [],
      info: { pages: 1 },
    });

    const props = {
      searchParams: Promise.resolve({ query: '', page: '1' }),
    };
    const Result = await MainPage(props);
    render(<Provider store={store}>{Result}</Provider>);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: '  rick  ' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalledWith('search-query', 'rick');
      expect(mockPush).toHaveBeenCalledWith('/?query=rick&page=1');
    });
  });

  it('should load query from localStorage', async () => {
    (CharacterService.getAllCharacters as jest.Mock).mockResolvedValue({
      results: [{ id: 1, name: 'Rick Sanchez' }],
      info: { pages: 1 },
    });

    const props = {
      searchParams: Promise.resolve({ query: 'rick', page: '1' }),
    };
    const Result = await MainPage(props);
    render(<Provider store={store}>{Result}</Provider>);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search...');
      expect(searchInput).toHaveValue('rick');
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });
});

describe('useLocalStorage', () => {
  it('should load saved value', () => {
    const testValue = 'test-value';
    mockGetItem.mockImplementation(() => testValue);

    const { result } = renderHook(() => useLocalStorage('test-key'));
    expect(result.current.value).toBe(testValue);
  });
});
