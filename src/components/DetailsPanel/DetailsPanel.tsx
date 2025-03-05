'use client';

import { DetailedCard, ErrorBlock } from '../../components';
import { Character } from '../../shared/types/character.interface';
import { handleError } from '../../utils/handle-error';

interface DetailedPanelProps {
  character: Character;
}
export const DetailsPanel = ({ character }: DetailedPanelProps) => {
  return (
    <div className="flex-1 flex justify-center flex-col gap-2 items-center">
      {'error' in character ? (
        <ErrorBlock errorText={handleError(character.error)} />
      ) : (
        <DetailedCard character={character} />
      )}
    </div>
  );
};
