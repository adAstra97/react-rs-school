import { FC } from 'react';
import { SearchCard } from '../Card/SearchCard/SearchCard';
import { CharacterCard } from '../../shared/types/types';

interface CardListProps {
  items: CharacterCard[];
}

export const CardList: FC<CardListProps> = ({ items }) => {
  return (
    <div className="my-5 h-[calc(100vh-200px)] overflow-x-hidden overflow-y-auto gap-2 flex flex-wrap justify-center">
      {items.map((item) => (
        <SearchCard key={item.id} card={item} />
      ))}
    </div>
  );
};
