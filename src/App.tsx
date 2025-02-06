import { useState, useEffect, FC } from 'react';
import { useSearchParams } from 'react-router';
import {
  CardList,
  ErrorBlock,
  Pagination,
  Search,
  Spinner,
} from './components';
import { Character } from './shared/types/character.interface';
import { CharacterService } from './services/character.service';
import { handleError } from './utils/handle-error';

const App: FC = () => {
  const [items, setItems] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    searchCharacters(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

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

  const handlePageChange = (page: number) => {
    setSearchParams({ query: searchQuery, page: String(page) });
  };

  return (
    <div className="mx-auto">
      <header className="border-b-amber-500 border-b-2 py-5">
        <Search
          searchQuery={searchQuery}
          onSearch={(query) => {
            setSearchParams({ query, page: '1' });
          }}
        />
      </header>
      <main className="max-w-[1280px] w-[calc(100vw-50px)] mx-auto">
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
  );
};

export default App;
