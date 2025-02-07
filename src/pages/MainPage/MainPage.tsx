import { FC, useEffect, useState } from 'react';
import { Character } from '../../shared/types/character.interface';
import { Outlet, useOutlet, useSearchParams } from 'react-router';
import { CharacterService } from '../../services/character.service';
import { handleError } from '../../utils/handle-error';
import {
  CardList,
  ErrorBlock,
  Pagination,
  Search,
  Spinner,
} from '../../components';

const MainPage: FC = () => {
  const [items, setItems] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const outlet = useOutlet();

  const searchQuery = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCharacters = async (query: string, page: number) => {
    setIsLoading(true);
    setError(null);

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
  };

  useEffect(() => {
    searchCharacters(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const handlePageChange = (page: number) => {
    setSearchParams({ query: searchQuery, page: String(page) });
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="mx-auto flex-[1_1_0%] px-5">
        <header className="py-5">
          <Search
            searchQuery={searchQuery}
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
      <div className={`${outlet ? 'w-[500px] flex-shrink-0 flex p-8' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
