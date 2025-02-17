import { SearchCard } from '../Card/SearchCard/SearchCard';
import { Character } from '../../shared/types/character.interface';

interface CardListProps {
  items: Character[];
}

export const CardList = ({ items }: CardListProps) => {
  return (
    <div className="my-5 h-[calc(100vh-200px)] overflow-x-hidden overflow-y-auto gap-2 flex flex-wrap justify-center">
      {items.map((item) => (
        <SearchCard key={item.id} card={item} />
      ))}
    </div>
  );
};
