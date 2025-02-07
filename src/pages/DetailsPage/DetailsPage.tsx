import { FC, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../shared/types/character.interface';
import { handleError } from '../../utils/handle-error';
import { ErrorBlock, Spinner } from '../../components';

const DetailsPage: FC = () => {
  const { id } = useParams();
  const location = useLocation();
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

  if (error) {
    return <ErrorBlock errorText={error} />;
  }

  if (!character) {
    return null;
  }

  return (
    <div className="flex-1 flex justify-center items-center relative">
      {isLoading && <Spinner />}
      {!isLoading && !error && (
        <>
          <Link
            to={`/${location.search}`}
            className="absolute right-0 top-[-5px] close"
          >
            Close
          </Link>
          <div className="flex border-amber-500 text-white border-2 rounded-2xl overflow-hidden w-full">
            <div className="flex flex-col flex-1">
              <img
                className="w-full h-[300px] object-cover object-center"
                src={character.image}
                alt={character.name}
              />
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="mb-1">
                  <h3>{character.name}</h3>
                  <span>{character.species}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-300">Last known location:</span>
                  <span>{character.location.name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-300">First seen in:</span>
                  <span>{character.origin.name}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsPage;
