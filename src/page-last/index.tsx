// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { useLocalStorage } from '../hooks/use-local-storage';
// import {
//   charactersApi,
//   getCharacter,
//   getCharacters,
//   getRunningQueriesThunk,
//   wrapper,
// } from '../redux';
// import {
//   CardList,
//   ErrorBlock,
//   OverlayWithClose,
//   Pagination,
//   Search,
//   Spinner,
//   ThemeSwitcher,
// } from '../components';
// import { Flyout } from '../components/Flyout/Flyout';
// import { handleError } from '../utils/handle-error';
// import DetailsPanel from '../components/DetailsPanel/DetailsPanel';
// import { useRouteLoader } from '../hooks/use-route-loader';

// interface QueryParams {
//   searchQuery: string;
//   currentPage: number;
// }

// const MainPage = ({ searchQuery, currentPage }: QueryParams) => {
//   const router = useRouter();
//   const { detailsId } = router.query;
//   const isRouteChanging = useRouteLoader();

//   const { value: savedQuery, setValue: setSavedQuery } =
//     useLocalStorage('search-query');

//   useEffect(() => {
//     setSavedQuery(searchQuery);
//   }, [searchQuery, setSavedQuery]);

//   const { data, isFetching, error, isError } =
//     charactersApi.useGetCharactersQuery({
//       name: searchQuery,
//       page: currentPage,
//     });

//   const items = data?.results || [];
//   const totalPages = data?.info.pages || 1;

//   const handleSearch = (query: string) => {
//     router.push({
//       query: { ...router.query, query, page: '1' },
//     });
//   };

//   const handlePageChange = (page: number) => {
//     router.push({
//       query: { ...router.query, page: String(page) },
//     });
//   };

//   return (
//     <div className="flex flex-row min-h-screen bg-mainBackground">
//       <ThemeSwitcher />
//       <div
//         className={`${detailsId ? 'border-r-2 border-r-stone-500 relative' : ''} mx-auto flex-[1_1_0%] px-5`}
//       >
//         <OverlayWithClose isOpen={!!detailsId} />
//         <header className="py-5">
//           <Search searchQuery={savedQuery} onSearch={handleSearch} />
//         </header>
//         <main className="max-w-[900px] mx-auto">
//           {isFetching || (isRouteChanging && !detailsId) ? (
//             <Spinner />
//           ) : isError ? (
//             <ErrorBlock errorText={error ? handleError(error) : ''} />
//           ) : (
//             <>
//               <CardList items={items || []} />
//               {totalPages && (
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPageChange={handlePageChange}
//                 />
//               )}
//             </>
//           )}
//         </main>
//       </div>
//       <Flyout />

//       {detailsId && (
//         <div className="w-[500px] flex p-8 relative">
//           <DetailsPanel />
//         </div>
//       )}
//     </div>
//   );
// };
