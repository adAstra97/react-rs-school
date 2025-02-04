import { useState, useEffect, FC } from 'react';
import { CardList, ErrorBlock, Search, Spinner } from './components';
import { Character } from './shared/types/character.interface';
import { CharacterService } from './services/character.service';
import { handleError } from './utils/handle-error';
import { useLocalStorage } from './hooks/use-local-storage';
import Pagination from './components/Pagination/Pagination';

const App: FC = () => {
  const [items, setItems] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { value: searchQuery, setValue: setSearchQuery } =
    useLocalStorage('saved-search-query');

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
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto">
      <header className="border-b-amber-500 border-b-2 py-5">
        <Search
          searchQuery={searchQuery}
          onSearch={(query) => {
            setSearchQuery(query);
            setCurrentPage(1);
          }}
        />
      </header>
      <main className="max-w-[1280px] w-[calc(100vw-50px)] mx-auto">
        {error ? <ErrorBlock errorText={error} /> : <CardList items={items} />}
        {totalPages && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
      {/* <ErrorButton /> */}
    </div>
  );
};

export default App;
