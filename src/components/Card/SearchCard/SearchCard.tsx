import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import {
  addSelectedCharacter,
  removeSelectedCharacter,
} from '../../../redux/slices/selectedCharactersSlice';
import { Character } from '../../../shared/types/character.interface';

interface SearchCardProps {
  card: Character;
}

export const SearchCard = ({ card }: SearchCardProps) => {
  const router = useRouter();

  const { id, name, image, species } = card;

  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    (state) => state.selectedCharacters
  );
  const isSelectedCharacter = selectedCharacters?.some(
    (character) => character.id === id
  );

  const handleSelectCharacter = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addSelectedCharacter(card));
    } else {
      dispatch(removeSelectedCharacter(id));
    }
  };

  const handleCardClick = () => {
    router.push({
      query: { ...router.query, detailsId: id },
    });
  };

  return (
    <div className="relative" data-testid="search-card">
      <input
        type="checkbox"
        checked={isSelectedCharacter}
        onChange={handleSelectCharacter}
        className="absolute top-2 left-2 w-8 h-8 z-10 accent-button rounded-md cursor-pointer"
      />
      <button onClick={handleCardClick} className="link">
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            width={200}
            height={200}
            className="object-cover object-center transition-opacity group-hover:opacity-100"
            src={image}
            alt={name}
            priority={true}
          />
          <div className="absolute inset-0 bg-cardOverlay transition-colors group-hover:bg-black/30" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 text-white">
            <h3 className="text-2xl font-bold mb-2 drop-shadow-md">{name}</h3>
            <span className="text-lg opacity-90 drop-shadow-md">{species}</span>
          </div>
        </div>
      </button>
    </div>
  );
};
