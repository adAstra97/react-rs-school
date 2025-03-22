import { memo } from 'react';
import { Country } from '../utils/types';

interface Props {
  item: Country;
  onCheckedCountry: (name: string) => void;
}

const CountryItem = ({ item, onCheckedCountry }: Props) => {
  return (
    <div
      onClick={() => onCheckedCountry(item.name.common)}
      className={`rounded-lg overflow-hidden shadow ${item.isVisited && 'shadow-[0_0_4px_6px_#76c3c1fc]'}`}
    >
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

const areEqual = (prev: Props, next: Props) =>
  prev.item.name.common === next.item.name.common &&
  prev.item.isVisited === next.item.isVisited &&
  prev.item.population === next.item.population &&
  prev.item.region === next.item.region;

export default memo(CountryItem, areEqual);
