import { useEffect, useState } from 'react';
import { Country } from '../utils/types';
import { BASE_URL } from '../utils/constants';
import { Header } from '../components/Header';
import { Container } from '../components/Container';
import { ControlPanel } from '../components/ControlPanel';
import { CountryList } from '../components/CountryList';
import { Spinner } from '../components/Spinner';

const MainPage = () => {
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

  return (
    <div>
      <Header />
      <div className="pt-20 bg-light">
        <Container>
          <ControlPanel />
          {loading ? <Spinner /> : <CountryList countries={countries} />}
        </Container>
      </div>
    </div>
  );
};

export default MainPage;
