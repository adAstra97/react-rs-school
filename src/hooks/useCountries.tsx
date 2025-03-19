import { useEffect, useState } from 'react';
import { Country, SortType } from '../utils/types';
import { BASE_URL } from '../utils/constants';

interface Props {
  searchTerm: string;
  selectedRegion: string;
  sortType: SortType;
}

export const useCountries = ({
  searchTerm,
  selectedRegion,
  sortType,
}: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filteredAndSortedCountries = countries
    .filter((country) => {
      const matchesRegion = selectedRegion
        ? country.region === selectedRegion
        : true;

      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesRegion && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortType) {
        case 'name-asc':
          return a.name.common.localeCompare(b.name.common);
        case 'name-desc':
          return b.name.common.localeCompare(a.name.common);
        case 'pop-asc':
          return a.population - b.population;
        case 'pop-desc':
          return b.population - a.population;
        default:
          return 0;
      }
    });

  return { countries: filteredAndSortedCountries, loading };
};
