import { Component } from 'react';

interface SearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

interface SearchState {
  searchQuery: string;
}

class Search extends Component<SearchProps, SearchState> {
  state = { searchQuery: this.props.searchQuery };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = () => {
    const { searchQuery } = this.state;
    const trimmedQuery = searchQuery.trim();

    this.props.onSearch(trimmedQuery);
    localStorage.setItem('saved-search-query', trimmedQuery);
  };

  render() {
    return (
      <div className=" flex items-center justify-center gap-2 max-w-[1280px] w-[calc(100vw-100px)] mx-auto">
        <input
          type="text"
          value={this.state.searchQuery}
          placeholder="Search..."
          onChange={this.handleChange}
        />
        <button className="text-lg" type="button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
