// import {
//   render,
//   screen,
//   fireEvent,
//   waitFor,
//   renderHook,
// } from '@testing-library/react';
// import { describe, beforeEach, vi } from 'vitest';
// import { MainPage } from '../pages';
// import { MemoryRouter, useSearchParams } from 'react-router';
// import { useLocalStorage } from '../hooks/use-local-storage';
// import { CharacterService } from '../services/character.service';

// vi.mock('../services/character.service', () => ({
//   CharacterService: {
//     getAllCharacters: vi.fn().mockResolvedValue({
//       data: {
//         info: { pages: 1 },
//         results: [],
//       },
//     }),
//   },
// }));

// let mockSearchParams = new URLSearchParams();
// const setSearchParamsMock = vi.fn((params: Record<string, string>) => {
//   mockSearchParams = new URLSearchParams(params);
// });

// vi.mock('react-router', async (importOriginal) => {
//   const actual = await importOriginal<typeof import('react-router')>();
//   return {
//     ...actual,
//     useSearchParams: vi.fn(() => [mockSearchParams, setSearchParamsMock]),
//   };
// });

// describe('Search component', () => {
//   beforeEach(() => {
//     localStorage.clear();
//     vi.clearAllMocks();
//     mockSearchParams = new URLSearchParams();
//   });

//   it('should save trimmed query to localStorage on search button click', async () => {
//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <MainPage />
//       </MemoryRouter>
//     );

//     const input = screen.getByPlaceholderText('Search...');
//     const button = screen.getByText('Search');

//     fireEvent.change(input, { target: { value: '  rick  ' } });
//     fireEvent.click(button);

//     await waitFor(() => {
//       expect(localStorage.getItem('search-query')).toBe('rick');
//       expect(setSearchParamsMock).toHaveBeenCalledWith({
//         query: 'rick',
//         page: '1',
//       });
//     });
//   });

//   it('should load query from localStorage', async () => {
//     const testQuery = 'rick';
//     const setSearchParamsMock = vi.fn();

//     vi.mocked(useSearchParams).mockReturnValue([
//       new URLSearchParams({ query: testQuery, page: '1' }),
//       setSearchParamsMock,
//     ]);

//     localStorage.setItem('search-query', testQuery);

//     render(
//       <MemoryRouter>
//         <MainPage />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
//     });

//     const searchInput = screen.getByPlaceholderText('Search...');
//     expect(searchInput).toHaveValue(testQuery);
//     expect(CharacterService.getAllCharacters).toHaveBeenCalledWith(
//       testQuery,
//       1
//     );
//   });
// });

// describe('useLocalStorage', () => {
//   it('should load saved value', () => {
//     localStorage.setItem('test-key', 'test-value');
//     const { result } = renderHook(() => useLocalStorage('test-key'));
//     expect(result.current.value).toBe('test-value');
//   });
// });
