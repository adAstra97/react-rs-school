import { useEffect } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';
import type { Route } from './+types/MainPage';
import { useLocalStorage } from '../hooks/use-local-storage';
import {
  CardList,
  ErrorBlock,
  OverlayWithClose,
  Pagination,
  Search,
  ThemeSwitcher,
} from '../components';
import { handleError } from '../utils/handle-error';
import { Flyout } from '../components/Flyout/Flyout';
import { useOpenDetailsPanel } from '../hooks/use-open-details-panel';

export default function MainPage({ loaderData }: Route.ComponentProps) {
  const { charactersData, error } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isOpenDetails = useOpenDetailsPanel();
  const { value: savedQuery, setValue: setSavedQuery } =
    useLocalStorage('search-query');

  const searchQuery = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const items = charactersData?.results || [];
  const totalPages = charactersData?.info?.pages || 1;

  useEffect(() => {
    setSavedQuery(searchQuery);
  }, [searchQuery, setSavedQuery]);

  const handlePageChange = (page: number) => {
    setSearchParams({ query: searchQuery, page: String(page) });
  };

  const handleCloseOutlet = () => {
    if (isOpenDetails) {
      navigate(`/${location.search}`);
    }
  };
  return (
    <div className="flex flex-row min-h-screen bg-mainBackground">
      <ThemeSwitcher />
      <div
        className={`${isOpenDetails ? 'border-r-2 border-r-stone-500 relative' : ''} mx-auto flex-[1_1_0%] px-5`}
      >
        <OverlayWithClose
          isOpen={!!isOpenDetails}
          onClose={handleCloseOutlet}
        />
        <Search
          searchQuery={savedQuery}
          onSearch={(query) => {
            setSearchParams({ query, page: '1' });
          }}
        />
        <main className="max-w-[900px] mx-auto">
          {error ? (
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
      <Flyout />
      {isOpenDetails && (
        <div className="w-[500px] flex p-8 relative">
          <Outlet />
        </div>
      )}
    </div>
  );
}
