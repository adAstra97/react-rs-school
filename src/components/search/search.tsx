import { useState, FC } from 'react';

interface SearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Search: FC<SearchProps> = ({ searchQuery, onSearch }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = () => {
    const trimmedQuery = localQuery.trim();
    onSearch(trimmedQuery);
  };

  return (
    <div className="flex items-center justify-center gap-2 max-w-[1280px] w-[calc(100vw-100px)] mx-auto">
      <input
        type="search"
        value={localQuery}
        placeholder="Search..."
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      <button className="text-lg" type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
