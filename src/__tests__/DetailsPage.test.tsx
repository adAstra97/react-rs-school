// import { render, screen, waitFor } from '@testing-library/react';
// import { MemoryRouter, Route, Routes } from 'react-router';
// import { vi } from 'vitest';
// import { DetailsPage } from '../pages';
// import { DetailedCharacterCard } from '../shared/types/types';
// import { useGetCharacterQuery } from '../redux/charactersApi';

// const mockCard: DetailedCharacterCard = {
//   id: 1,
//   name: 'Rick Sanchez',
//   image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
//   species: 'Human',
//   location: {
//     name: 'Earth',
//     url: 'https://rickandmortyapi.com/api/location/1',
//   },
//   origin: {
//     name: 'Earth',
//     url: 'https://rickandmortyapi.com/api/location/1',
//   },
// };
// vi.mock('../redux/charactersApi.ts', () => ({
//   useGetCharacterQuery: vi.fn(),
// }));

// describe('DetailsPage', () => {
//   it('should show a loading indicator while fetching data', async () => {
//     (useGetCharacterQuery as jest.Mock).mockReturnValue({
//       data: undefined,
//       isLoading: true,
//     });
//     render(
//       <MemoryRouter initialEntries={['/details/1']}>
//         <Routes>
//           <Route path="/details/:id" element={<DetailsPage />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     expect(screen.getByTestId('spinner')).toBeInTheDocument();

//     await waitFor(() => expect(screen.queryByTestId('spinner')).toBeNull());
//   });

//   it('should display character details when data is loaded', async () => {
//     (useGetCharacterQuery as jest.Mock).mockReturnValue({
//       data: mockCard,
//       isLoading: false,
//     });

//     render(
//       <MemoryRouter initialEntries={['/details/1']}>
//         <Routes>
//           <Route path="/details/:id" element={<DetailsPage />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
//     expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
//   });
// });
