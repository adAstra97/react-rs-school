import { Country } from '../utils/types';

export const CountryItem = ({ item }: { item: Country }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow">
      <img
        src={item.flags.png}
        alt={item.name.common}
        className="w-full h-auto aspect-[2/1.2] object-cover"
      />
      <div className="bg-white px-5 pt-4 pb-8 flex flex-col gap-y-1">
        <h2 className="text-xl font-bold pb-1.5">{item.name.common}</h2>
        <span>
          <b>Population:</b> {item.population.toLocaleString('en-US')}
        </span>
        <span>
          <b>Region:</b> {item.region}
        </span>
      </div>
    </div>
  );
};
