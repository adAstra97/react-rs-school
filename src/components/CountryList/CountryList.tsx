import { useAppSelector } from '../../redux/hooks';

export const CountryList = () => {
  const countries = useAppSelector((store) => store.countries);

  return (
    <datalist id="country-list">
      {countries.map((country) => (
        <option key={country.id} value={country.name} />
      ))}
    </datalist>
  );
};
