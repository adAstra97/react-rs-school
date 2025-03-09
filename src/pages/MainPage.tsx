import { useEffect } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
  useSearchParams,
} from 'react-router';
import { useLocalStorage } from '../hooks/use-local-storage';
import {
  CardList,
  ErrorBlock,
  OverlayWithClose,
  Pagination,
  Search,
  Spinner,
  ThemeSwitcher,
} from '../components';
import { handleError } from '../utils/handle-error';
import { Flyout } from '../components/Flyout/Flyout';
import { useOpenDetailsPanel } from '../hooks/use-open-details-panel';
import { CharacterResponse } from '../shared/types/character.interface';

interface Props {
  loaderData: {
    charactersData?: CharacterResponse;
    error?: unknown;
    searchQuery: string;
    currentPage: number;
  };
}

export default function MainPage({ loaderData }: Props) {
  const { charactersData, error, searchQuery, currentPage } = loaderData;
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = useNavigation();
  const isOpenDetails = useOpenDetailsPanel();
  const { value: savedQuery, setValue: setSavedQuery } =
    useLocalStorage('search-query');

  const showingDetails = navigation?.location?.pathname.includes('details');

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
          {navigation?.state === 'loading' && !showingDetails ? (
            <Spinner />
          ) : error ? (
            <ErrorBlock errorText={handleError(error)} />
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
      <div className={`${isOpenDetails ? 'w-[500px]' : ''} flex p-8 relative`}>
        <Outlet />
      </div>
    </div>
  );
}
