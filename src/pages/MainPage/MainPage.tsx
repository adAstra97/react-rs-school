import { FC, useCallback, useEffect, useState } from 'react';
import { Character } from '../../shared/types/character.interface';
import { Outlet, useNavigate, useOutlet, useSearchParams } from 'react-router';
import { CharacterService } from '../../services/character.service';
import { handleError } from '../../utils/handle-error';
import { useLocalStorage } from '../../hooks/use-local-storage';
import {
  CardList,
  ErrorBlock,
  OverlayWithClose,
  Pagination,
  Search,
  Spinner,
} from '../../components';

const MainPage: FC = () => {
  const [items, setItems] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { value: savedQuery, setValue: setSavedQuery } =
    useLocalStorage('search-query');
  const outlet = useOutlet();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const searchCharacters = useCallback(
    async (query: string, page: number) => {
      setIsLoading(true);
      setError(null);
      setSavedQuery(query);

      try {
        const {
          data: { info, results },
        } = await CharacterService.getAllCharacters(query, page);
        setItems(results || []);
        setTotalPages(info.pages);
      } catch (err) {
        setError(handleError(err));
        setTotalPages(null);
      } finally {
        setIsLoading(false);
      }
    },
    [setSavedQuery]
  );

  useEffect(() => {
    searchCharacters(searchQuery, currentPage);
  }, [searchQuery, currentPage, searchCharacters]);

  const handlePageChange = (page: number) => {
    setSearchParams({ query: searchQuery, page: String(page) });
  };

  const handleCloseOutlet = () => {
    if (outlet) {
      navigate(`/${location.search}`);
    }
  };

  return (
    <div className="flex flex-row gap-2 min-h-screen">
      <div
        className={`${outlet ? 'border-r-2 border-r-stone-600 relative' : ''} mx-auto flex-[1_1_0%] px-5`}
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
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <ErrorBlock errorText={error} />
          ) : (
            <>
              <CardList items={items} />
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
      <div className={`${outlet ? 'w-[500px] flex p-8' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
