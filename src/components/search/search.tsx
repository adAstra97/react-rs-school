'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/use-local-storage';

interface SearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const Search = ({ searchQuery, onSearch }: SearchProps) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const { setValue: setSavedQuery } = useLocalStorage('search-query');

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    const trimmedQuery = localQuery.trim();
    onSearch(trimmedQuery);
    setSavedQuery(trimmedQuery);
  };

  return (
    <header className="flex items-center justify-center gap-2 max-w-[900px] py-5 w-[30vw] mx-auto">
      <input
        className="w-full border-2 bg-detailsBackground placeholder:text-orange-400 border-button rounded-md p-2 min-w-[200px] text-sm text-primary focus:outline-none"
        type="search"
        value={localQuery}
        placeholder="Search..."
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      <button className="text-lg" type="button" onClick={handleSearch}>
        Search
      </button>
    </header>
  );
};
