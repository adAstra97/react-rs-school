import { Component } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

interface SearchState {
  searchQuery: string;
}

class Search extends Component<SearchProps, SearchState> {
  savedSearchQuery = localStorage.getItem('saved-search-query') || '';
  state = { searchQuery: this.savedSearchQuery };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = (): void => {
    const { searchQuery } = this.state;
    const trimmedQuery = searchQuery.trim();

    this.props.onSearch(trimmedQuery);
    localStorage.setItem('saved-search-query', trimmedQuery);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchQuery}
          placeholder="Search..."
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
