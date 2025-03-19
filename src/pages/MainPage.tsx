import { Header } from '../components/Header';
import { Container } from '../components/Container';
import { CountryList } from '../components/CountryList';
import { Spinner } from '../components/Spinner';
import { useCountries } from '../hooks/useCountries';
import { RegionFilter } from '../components/RegionFilter';
import { Search } from '../components/Search';
import { useState } from 'react';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { countries, loading, setSelectedRegion } = useCountries(searchTerm);

  return (
    <div>
      <Header />
      <div className="pt-[68px] bg-light">
        <Container>
          <div className="flex justify-between items-center py-8 flex-wrap">
            <Search value={searchTerm} onChange={setSearchTerm} />
            <div>
              <RegionFilter onSelect={setSelectedRegion} />
            </div>
          </div>
          {loading ? <Spinner /> : <CountryList countries={countries} />}
        </Container>
      </div>
    </div>
  );
};

export default MainPage;
