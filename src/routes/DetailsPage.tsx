import { getCharacter, store } from '../redux';
import { handleError } from '../utils/handle-error';
import { DetailedCard, ErrorBlock } from '../components';
import type { Route } from './+types/DetailsPage';

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const detailsId = params.detailsId || '';
    const characterData = await store
      .dispatch(getCharacter.initiate(detailsId))
      .unwrap();

    return { characterData };
  } catch (error) {
    return { error };
  }
}

export default function DetailsPage({ loaderData }: Route.ComponentProps) {
  const { characterData, error } = loaderData;

  return (
    <div className="flex-1 flex justify-center flex-col gap-2 items-center">
      {error ? (
        <ErrorBlock errorText={handleError(error)} />
      ) : (
        <DetailedCard character={characterData} />
      )}
    </div>
  );
}
