import { Country } from '../utils/types';
import { CountryItem } from './CountryItem';

export const CountryList = ({
  countries,
  onCheckedCountry,
}: {
  countries: Country[];
  onCheckedCountry: (name: string) => void;
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
      {countries.map((item) => (
        <CountryItem
          key={item.name.common}
          item={item}
          onCheckedCountry={onCheckedCountry}
        />
      ))}
    </div>
  );
};
