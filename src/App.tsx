import { useState, useEffect, FC } from 'react';
import {
  CardList,
  ErrorBlock,
  ErrorButton,
  Search,
  Spinner,
} from './components';
import { Character } from './shared/types/character.interface';
import { CharacterService } from './services/character.service';
import { handleError } from './utils/handle-error';
import { useLocalStorage } from './hooks/use-local-storage';

const App: FC = () => {
  const [items, setItems] = useState<Character[]>([]);
  const { value: searchQuery, setValue: setSearchQuery } =
    useLocalStorage('saved-search-query');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    searchCharacters(searchQuery);
  }, [searchQuery]);

  const searchCharacters = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const {
        data: { results },
      } = await CharacterService.getAllCharacters(query);
      setItems(results || []);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setIsLoading(false);
    }
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
            searchCharacters(query);
          }}
        />
      </header>
      <main className="max-w-[1280px] w-[calc(100vw-50px)] mx-auto">
        {error && <ErrorBlock errorText={error} />}
        {!isLoading && !error && <CardList items={items} />}
      </main>
      <ErrorButton />
    </div>
  );
};

export default App;
