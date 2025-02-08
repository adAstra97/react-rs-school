import { FC } from 'react';
import { Link } from 'react-router';
import { CharacterCard } from '../../../shared/types/types';

interface SearchCardProps {
  card: CharacterCard;
}

export const SearchCard: FC<SearchCardProps> = ({ card }) => {
  const { id, name, image, species } = card;

  return (
    <Link
      to={`/details/${id}${location.search}`}
      className="h-auto max-h-[200px]"
    >
      <div className="relative rounded-2xl overflow-hidden group">
        <img
          className="w-[200px] h-[200px] object-cover object-center transition-opacity group-hover:opacity-100"
          src={image}
          alt={name}
        />
        <div className="absolute inset-0 bg-black/70 transition-colors group-hover:bg-black/30" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 text-white">
          <h3 className="text-2xl font-bold mb-2 drop-shadow-md">{name}</h3>
          <span className="text-lg opacity-90 drop-shadow-md">{species}</span>
        </div>
      </div>
    </Link>
  );
};
