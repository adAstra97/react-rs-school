import { Header } from '../components/Header';
import { Container } from '../components/Container';
import { CountryList } from '../components/CountryList';
import { Spinner } from '../components/Spinner';
import { useCountries } from '../hooks/useCountries';
import { RegionFilter } from '../components/RegionFilter';
import { Search } from '../components/Search';
import { useState } from 'react';
import { SortType } from '../utils/types';
import { Sort } from '../components/Sort';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [sortType, setSortType] = useState<SortType>('name-asc');
  const { countries, loading } = useCountries({
    searchTerm,
    selectedRegion,
    sortType,
  });

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
          {loading ? <Spinner /> : <CountryList countries={countries} />}
        </Container>
      </div>
    </div>
  );
};

export default MainPage;
