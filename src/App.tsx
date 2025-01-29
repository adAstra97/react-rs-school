import { Component } from 'react';
import { CardList, ErrorBoundary, ErrorButton, Search } from './components';
import { Character } from './shared/types/character.interface';
import { CharacterService } from './services/character.service';

interface AppState {
  items: Character[];
  isLoading: boolean;
  error: string | null;
}

class App extends Component<unknown, AppState> {
  state = {
    items: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    const savedSearchQuery = localStorage.getItem('saved-search-query') || '';
    this.searchCaracters(savedSearchQuery);
  }

  searchCaracters = async (query: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const {
        data: { results },
      } = await CharacterService.getAllCaracters(query);
      console.log(results);
      this.setState({ items: results });
    } catch (error) {
      console.error('Error fetching characters:', error);
      this.setState({ error: 'Failed to fetch characters.' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { items, error, isLoading } = this.state;

    return (
      <ErrorBoundary>
        <div className="app">
          <header className="app__header">
            <Search onSearch={this.searchCaracters} />
          </header>
          <main className="app__content">
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <CardList items={items} />
          </main>
          <ErrorButton />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
