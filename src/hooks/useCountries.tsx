import { useEffect, useState } from 'react';
import { Country } from '../utils/types';
import { BASE_URL } from '../utils/constants';

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
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

  const filteredCountries = selectedRegion
    ? countries.filter((country) => country.region === selectedRegion)
    : countries;

  return { countries: filteredCountries, loading, setSelectedRegion };
};
