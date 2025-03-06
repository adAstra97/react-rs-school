'use client';

import { DetailedCard, ErrorBlock, Spinner } from '../../components';
import { Character } from '../../shared/types/character.interface';
import { handleError } from '../../utils/handle-error';
import { useDetailsLoading } from '../../hooks/use-details-loading';
import { useSearchParams } from 'next/navigation';

interface DetailedPanelProps {
  character: Character;
}
export const DetailsPanel = ({ character }: DetailedPanelProps) => {
  const searchParams = useSearchParams();
  const detailsId = searchParams.get('detailsId');
  const { isDetailsLoading } = useDetailsLoading(detailsId);

  return (
    <div className="flex-1 flex justify-center flex-col gap-2 items-center details-panel-fade">
      {isDetailsLoading ? (
        <Spinner />
      ) : character?.error ? (
        <ErrorBlock errorText={handleError(character.error)} />
      ) : (
        <DetailedCard character={character} />
      )}
    </div>
  );
};
