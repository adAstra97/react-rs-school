import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../shared/types/character.interface';
import { handleError } from '../../utils/handle-error';
import { ErrorBlock, Spinner } from '../../components';
import HomeIcon from '../../assets/icons/close.svg';

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

  if (!character) {
    return null;
  }

  return (
    <div className="flex-1 flex justify-center flex-col gap-2 items-center relative">
      {isLoading && <Spinner />}
      {error && <ErrorBlock errorText={error} />}
      {!isLoading && !error && (
        <>
          <Link to={`/${location.search}`} className="close self-start">
            <img src={HomeIcon} width={30} height={30} alt="close" />
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
