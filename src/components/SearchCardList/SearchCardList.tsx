import { FC } from 'react';
import { Character } from '../../shared/types/character.interface';
import { SearchCard } from '../Card/SearchCard/SearchCard';

interface SearchCardListProps {
  items: Character[];
}

export const SearchCardList: FC<SearchCardListProps> = ({ items }) => {
  return (
    <div className="my-5 h-[calc(100vh-200px)] overflow-x-hidden overflow-y-auto gap-2 flex flex-wrap justify-center">
      {items.map((item) => (
        <SearchCard key={item.id} card={item} />
      ))}
    </div>
  );
};
