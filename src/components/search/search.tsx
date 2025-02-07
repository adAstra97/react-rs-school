import { useState, FC, useEffect } from 'react';

interface SearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Search: FC<SearchProps> = ({ searchQuery, onSearch }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    const trimmedQuery = localQuery.trim();
    onSearch(trimmedQuery);
  };

  return (
    <div className="flex items-center justify-center gap-2 max-w-[900px] w-[30vw] mx-auto">
      <input
        className="w-full"
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
