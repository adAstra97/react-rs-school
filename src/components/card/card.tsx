import { FC } from 'react';
import { Character } from '../../shared/types/character.interface';

interface CardProps {
  card: Character;
}

const Card: FC<CardProps> = ({ card }) => {
  const { name, image, species, location, origin } = card;

  return (
    <div className="flex border-amber-500 text-white border-2 w-[600px] rounded-2xl overflow-hidden">
      <div className="flex-[1_1_0%] w-full">
        <img
          className="w-full h-full object-cover object-center"
          src={image}
          alt={name}
        />
      </div>
      <div className="p-4 flex-[1.1_1_0%] flex flex-col gap-2">
        <div className="mb-1">
          <h3>{name}</h3>
          <span>{species}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-300">Last known location:</span>
          <span>{location.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-300">First seen in:</span>
          <span>{origin.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
