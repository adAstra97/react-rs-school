import { Component } from 'react';
import { CardList, ErrorButton, Search } from './components';
import { Character } from './shared/types/character.interface';
import { CharacterService } from './services/character.service';
import Spinner from './components/spinner/spinner';
import { handleError } from './utils/handle-error';

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
      <div className="max-w">
        <header className="app__header">
          <Search onSearch={this.searchCharacters} />
        </header>
        <main className="app__content">
          {isLoading && <Spinner />}
          {error && <p>{error}</p>}
          {!isLoading && !error && <CardList items={items} />}
        </main>
        <ErrorButton />
      </div>
    );
  }
}

export default App;
