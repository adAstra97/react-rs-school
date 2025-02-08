import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../shared/types/character.interface';
import { handleError } from '../../utils/handle-error';
import { DetailedCard, ErrorBlock, Spinner } from '../../components';

const DetailsPage: FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCharacter = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!id) {
          throw new Error('Invalid character ID');
        }

        const { data } = await CharacterService.getCharacter(id);
        setCharacter(data);
      } catch (err) {
        setError(handleError(err));
      } finally {
        setIsLoading(false);
      }
    };

    getCharacter();
  }, [id]);

  return (
    <div className="flex-1 flex justify-center flex-col gap-2 items-center">
      {isLoading && <Spinner />}
      {error && <ErrorBlock errorText={error} />}
      {!isLoading && !error && character && (
        <DetailedCard character={character} />
      )}
    </div>
  );
};

export default DetailsPage;
