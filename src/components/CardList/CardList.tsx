import { FC } from 'react';
import { Character } from '../../shared/types/character.interface';
import Card from '../Card/Card';

interface CardListProps {
  items: Character[];
}

const CardList: FC<CardListProps> = ({ items }) => {
  return (
    <div className="my-5 h-[calc(100vh-200px)] overflow-x-hidden overflow-y-auto gap-2 flex flex-wrap justify-center">
      {items.map((item) => (
        <Card key={item.id} card={item} />
      ))}
    </div>
  );
};

export default CardList;
