import { Component } from 'react';
import { CardList, ErrorButton, Search } from './components';
import { Character } from './shared/types/character.interface';
import { CharacterService } from './services/character.service';
import spinner from '/spinner.svg';
import { AxiosError } from 'axios';
import { GENERIC_ERROR_MESSAGE } from './shared/constants';

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
    this.searchCharacters(savedSearchQuery);
  }

  searchCharacters = async (query: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const {
        data: { results },
      } = await CharacterService.getAllCharacters(query);

      this.setState({ items: results });
    } catch (error) {
      if (error instanceof AxiosError) {
        this.setState({
          error: error.response?.data?.error || GENERIC_ERROR_MESSAGE,
        });
      } else {
        this.setState({ error: GENERIC_ERROR_MESSAGE });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { items, error, isLoading } = this.state;

    return (
      <div className="app">
        <header className="app__header">
          <Search onSearch={this.searchCharacters} />
        </header>
        <main className="app__content">
          {isLoading && (
            <div className="spinner">
              <img src={spinner} alt="loading" />
            </div>
          )}
          {error && <p>{error}</p>}
          {!isLoading && !error && <CardList items={items} />}
        </main>
        <ErrorButton />
      </div>
    );
  }
}

export default App;
