import { DetailedCard, ErrorBlock, Spinner } from '../../components';
import { useGetCharacterQuery } from '../../redux';
import { handleError } from '../../utils/handle-error';
import { useRouter } from 'next/router';

const DetailsPanel = () => {
  const router = useRouter();
  const { detailsId } = router.query;
  const detailsIdParam = Array.isArray(detailsId)
    ? detailsId[0]
    : detailsId || '';

  const { data, isFetching, error } = useGetCharacterQuery(
    detailsIdParam || '',
    {
      skip: !detailsIdParam,
    }
  );

  if (!detailsIdParam) {
    return <ErrorBlock errorText="Invalid character ID" />;
  }

  return (
    <div className="flex-1 flex justify-center flex-col gap-2 items-center">
      {isFetching && <Spinner />}
      {error && <ErrorBlock errorText={handleError(error)} />}
      {!isFetching && !error && data && <DetailedCard character={data} />}
    </div>
  );
};

export default DetailsPanel;
