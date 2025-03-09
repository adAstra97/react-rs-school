import { DetailedCard, ErrorBlock, Spinner } from '../../components';
import { useGetCharacterQuery } from '../../redux';
import { handleError } from '../../utils/handle-error';
import { useDetailsLoader } from '../../hooks/use-details-loader';

const DetailsPanel = ({ detailsId }: { detailsId: string }) => {
  const { data, isFetching, error } = useGetCharacterQuery(detailsId, {
    skip: !detailsId,
  });

  const showLoader = useDetailsLoader(isFetching, detailsId);

  if (!detailsId) return null;

  return (
    <div className="flex-1 flex justify-center flex-col gap-2 items-center min-h-[400px]">
      {showLoader ? (
        <Spinner />
      ) : error ? (
        <ErrorBlock errorText={handleError(error)} />
      ) : data ? (
        <DetailedCard character={data} />
      ) : null}
    </div>
  );
};

export default DetailsPanel;
