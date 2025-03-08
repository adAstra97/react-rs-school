import { getCharacter, store } from '../redux';
import { handleError } from '../utils/handle-error';
import { DetailedCard, ErrorBlock, Spinner } from '../components';
import type { Route } from './+types/DetailsPage';
import { useDetailsLoading } from '../hooks/use-details-loading';

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const detailsId = params.detailsId || '';
    const characterData = await store
      .dispatch(getCharacter.initiate(detailsId))
      .unwrap();

    return { characterData, detailsId };
  } catch (error) {
    return { error };
  }
}

export default function DetailsPage({ loaderData }: Route.ComponentProps) {
  const { characterData, detailsId, error } = loaderData;
  const isDetailsLoading = useDetailsLoading(detailsId);

  return (
    <div className="flex-1 flex justify-center flex-col gap-2 items-center details-panel-fade">
      {isDetailsLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorBlock errorText={handleError(error)} />
      ) : (
        <DetailedCard character={characterData} />
      )}
    </div>
  );
}
