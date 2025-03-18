import { Country } from '../utils/types';
import { CountryItem } from './CountryItem';

export const CountryList = ({ countries }: { countries: Country[] }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
      {countries.map((item) => (
        <CountryItem key={item.name.common} item={item} />
      ))}
    </div>
  );
};
