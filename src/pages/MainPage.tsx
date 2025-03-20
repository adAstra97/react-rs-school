import { Header } from '../components/Header';
import { Container } from '../components/Container';
import { CountryList } from '../components/CountryList';
import { Spinner } from '../components/Spinner';
import { useCountries } from '../hooks/useCountries';
import { RegionFilter } from '../components/RegionFilter';
import { Search } from '../components/Search';
import { useEffect, useState } from 'react';
import { SortType } from '../utils/types';
import { Sort } from '../components/Sort';
import { LS_KEY } from '../utils/constants';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [sortType, setSortType] = useState<SortType>('name-asc');
  const [visitedCountries, setVisitedCountries] = useState<string[]>(() => {
    const savedCountries = localStorage.getItem(LS_KEY);
    return savedCountries ? JSON.parse(savedCountries) : [];
  });
  const { countries, loading } = useCountries({
    searchTerm,
    selectedRegion,
    sortType,
    visitedCountries,
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(visitedCountries));
  }, [visitedCountries]);

  const handleVisitedCountries = (name: string) => {
    setVisitedCountries((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  return (
    <div>
      <Header />
      <div className="pt-[68px] bg-light">
        <Container>
          <div className="flex justify-between items-center py-8 flex-wrap">
            <Search value={searchTerm} onChange={setSearchTerm} />
            <div className="flex gap-2">
              <RegionFilter onSelect={setSelectedRegion} />
              <Sort onSort={setSortType} />
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <CountryList
              countries={countries}
              onCheckedCountry={handleVisitedCountries}
            />
          )}
        </Container>
      </div>
    </div>
  );
};

export default MainPage;
