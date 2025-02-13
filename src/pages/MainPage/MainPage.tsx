import { useEffect } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutlet,
  useSearchParams,
} from 'react-router';
import { handleError } from '../../utils/handle-error';
import { useLocalStorage } from '../../hooks/use-local-storage';
import {
  ErrorBlock,
  OverlayWithClose,
  Pagination,
  Search,
  CardList,
  Spinner,
  ThemeSwitcher,
} from '../../components';
import { useGetCharactersQuery } from '../../redux';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { value: savedQuery, setValue: setSavedQuery } =
    useLocalStorage('search-query');
  const outlet = useOutlet();
  const navigate = useNavigate();
  const location = useLocation();

  const searchQuery = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const { data, isFetching, error, isError } = useGetCharactersQuery({
    name: searchQuery,
    page: currentPage,
  });

  const items = data?.results || [];
  const totalPages = data?.info.pages || 1;

  useEffect(() => {
    setSavedQuery(searchQuery);
  }, [searchQuery, setSavedQuery]);

  const handlePageChange = (page: number) => {
    setSearchParams({ query: searchQuery, page: String(page) });
  };

  const handleCloseOutlet = () => {
    if (outlet) {
      navigate(`/${location.search}`);
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-mainBackground">
      <ThemeSwitcher />
      <div
        className={`${outlet ? 'border-r-2 border-r-stone-500 relative' : ''} mx-auto flex-[1_1_0%] px-5`}
      >
        <OverlayWithClose isOpen={!!outlet} onClose={handleCloseOutlet} />
        <header className="py-5">
          <Search
            searchQuery={savedQuery}
            onSearch={(query) => {
              setSearchParams({ query, page: '1' });
            }}
          />
        </header>
        <main className="max-w-[900px] mx-auto">
          {isFetching ? (
            <Spinner />
          ) : isError ? (
            <ErrorBlock errorText={error ? handleError(error) : ''} />
          ) : (
            <>
              <CardList items={items || []} />
              {totalPages && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </main>
      </div>
      <div className={`${outlet ? 'w-[500px] flex p-8 relative' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
