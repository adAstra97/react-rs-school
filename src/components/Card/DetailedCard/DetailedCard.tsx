import { Link, useLocation } from 'react-router';
import HomeIcon from '../../../assets/icons/close.svg';
import { FC } from 'react';
import { DetailedCharacterCard } from '../../../shared/types/types';

interface DetailedCardProps {
  character: DetailedCharacterCard;
}

export const DetailedCard: FC<DetailedCardProps> = ({ character }) => {
  const location = useLocation();

  return (
    <>
      <Link to={`/${location.search}`} className="close self-start">
        <img src={HomeIcon} width={40} height={40} alt="close" />
      </Link>
      <div className="flex border-amber-500 text-white border-2 rounded-2xl overflow-hidden w-full">
        <div className="flex flex-col flex-1">
          <img
            className="w-full h-[300px] object-cover object-center"
            src={character.image}
            alt={character.name}
          />
          <div className="p-4 flex flex-col gap-2 flex-1">
            <div className="mb-1">
              <h3>{character.name}</h3>
              <span>{character.species}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-300">Last known location:</span>
              <span>{character.location.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-300">First seen in:</span>
              <span>{character.origin.name}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
