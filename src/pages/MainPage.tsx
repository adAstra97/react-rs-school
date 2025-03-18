import { Header } from '../components/Header';
import { Container } from '../components/Container';
import { ControlPanel } from '../components/ControlPanel';
import { CountryList } from '../components/CountryList';
import { Spinner } from '../components/Spinner';
import { useCountries } from '../hooks/useCountries';

const MainPage = () => {
  const { countries, loading, setSelectedRegion } = useCountries();

  return (
    <div>
      <Header />
      <div className="pt-[68px] bg-light">
        <Container>
          <ControlPanel onRegionSelect={setSelectedRegion} />
          {loading ? <Spinner /> : <CountryList countries={countries} />}
        </Container>
      </div>
    </div>
  );
};

export default MainPage;
