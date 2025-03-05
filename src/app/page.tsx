import { CharacterService } from '../services/character.service';
import ClientPage from './client-page';

interface SearchParams {
  searchParams?: Record<string, string | string[] | undefined>;
}

const MainPage = async ({ searchParams = {} }: SearchParams) => {
  const { query, page, detailsId } = await searchParams;
  const searchQuery = query?.toString() || '';
  const currentPage = Number(page) || 1;
  const detailsIdString = detailsId?.toString();

  const charactersData = await CharacterService.getAllCharacters(
    searchQuery,
    currentPage
  );

  let characterDetails = null;

  if (detailsIdString) {
    characterDetails = await CharacterService.getCharacter(detailsIdString);
  }

  return (
    <ClientPage
      charactersData={charactersData}
      searchQuery={searchQuery}
      currentPage={currentPage}
      characterDetails={characterDetails}
    />
  );
};

export default MainPage;
