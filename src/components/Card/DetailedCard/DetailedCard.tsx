'use client';

import Image from 'next/image';
import { Character } from '../../../shared/types/character.interface';
import { useCloseDetails } from '../../../hooks/use-close-details';

interface DetailedCardProps {
  character: Character;
}

export const DetailedCard = ({ character }: DetailedCardProps) => {
  const handleClose = useCloseDetails();

  return (
    <>
      <button onClick={handleClose} className="link" data-testid="close-button">
        <Image
          src="/assets/icons/close.svg"
          width={40}
          height={40}
          alt="close"
        />
      </button>
      <div className="flex border-primary text-contrast shadow-2xl bg-detailsBackground border-2 rounded-2xl overflow-hidden w-full">
        <div className="flex flex-col flex-1">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-[300px] object-cover object-center"
            src={character.image}
            alt={character.name}
            priority={true}
          />
          <div className="p-4 flex flex-col gap-2 flex-1">
            <div className="mb-1">
              <h4>{character.name}</h4>
              <span>{character.species}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-secondary font-medium">
                Last known location:
              </span>
              <span>{character.location.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-secondary font-medium">First seen in:</span>
              <span>{character.origin.name}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
