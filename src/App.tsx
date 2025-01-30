import { Component } from 'react';
import { CardList, ErrorButton, Search } from './components';
import { Character } from './shared/types/character.interface';
import { CharacterService } from './services/character.service';
import Spinner from './components/spinner/spinner';
import { handleError } from './utils/handle-error';
import ErrorBlock from './components/error-block/error-block';

interface AppState {
  items: Character[];
  isLoading: boolean;
  error: string | null;
}

class App extends Component<unknown, AppState> {
  state: AppState = {
    items: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    const savedSearchQuery = localStorage.getItem('saved-search-query') || '';
    this.searchCharacters(savedSearchQuery);
  };

  searchCharacters = async (query: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const {
        data: { results },
      } = await CharacterService.getAllCharacters(query);

      this.setState({ items: results });
    } catch (error) {
      this.setState({ error: handleError(error) });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { items, error, isLoading } = this.state;

    return (
      <div className="mx-auto">
        <header className="border-b-amber-500 border-b-2 py-5">
          <Search onSearch={this.searchCharacters} />
        </header>
        <main className="max-w-[1280px] w-[calc(100vw-50px)] mx-auto">
          {isLoading && <Spinner />}
          {error && <ErrorBlock errorText={error} />}
          {!isLoading && !error && <CardList items={items} />}
        </main>
        <ErrorButton />
      </div>
    );
  }
}

export default App;
