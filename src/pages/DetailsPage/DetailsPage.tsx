import { useParams } from 'react-router';
import { DetailedCard, ErrorBlock, Spinner } from '../../components';
import { useGetCharacterQuery } from '../../redux';
import { handleError } from '../../utils/handle-error';

const DetailsPage = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetCharacterQuery(id || '', {
    skip: !id,
  });

  if (!id) {
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

export default DetailsPage;
