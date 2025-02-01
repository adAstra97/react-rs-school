import { Component } from 'react';
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

interface AppState {
  items: Character[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

class App extends Component<unknown, AppState> {
  state: AppState = {
    items: [],
    searchQuery: localStorage.getItem('saved-search-query') || '',
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    this.searchCharacters(this.state.searchQuery);
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
    const { items, searchQuery, error, isLoading } = this.state;

    return (
      <div className="mx-auto">
        <header className="border-b-amber-500 border-b-2 py-5">
          <Search searchQuery={searchQuery} onSearch={this.searchCharacters} />
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
