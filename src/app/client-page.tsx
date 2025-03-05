'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  CardList,
  DetailsPanel,
  ErrorBlock,
  Flyout,
  OverlayWithClose,
  Pagination,
  Search,
  Spinner,
  ThemeSwitcher,
} from '../components';
import {
  Character,
  CharacterResponse,
} from '../shared/types/character.interface';
import { useLocalStorage } from '../hooks/use-local-storage';
import { useEffect, useState } from 'react';
import { handleError } from '../utils/handle-error';
import { useDetailsLoading } from '../hooks/use-details-loading';

interface ClientPageProps {
  charactersData: CharacterResponse;
  searchQuery: string;
  currentPage: number;
  characterDetails?: Character | null;
}

const ClientPage = ({
  charactersData,
  searchQuery,
  currentPage,
  characterDetails,
}: ClientPageProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const detailsId = searchParams.get('detailsId');
  const { isDetailsLoading } = useDetailsLoading(detailsId);
  const { value: savedQuery, setValue: setSavedQuery } =
    useLocalStorage('search-query');

  useEffect(() => {
    setSavedQuery(searchQuery);
  }, [searchQuery, setSavedQuery]);

  useEffect(() => {
    setIsLoading(false);
  }, [charactersData]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set('query', query);
    params.set('page', '1');
    router.push('/?' + params.toString());
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push('/?' + params.toString());
  };

  const items = charactersData?.results || [];
  const totalPages = charactersData?.info?.pages || 1;

  return (
    <div className="flex flex-row min-h-screen bg-mainBackground">
      <ThemeSwitcher />
      <div
        className={`${detailsId ? 'border-r-2 border-r-stone-500 relative' : ''} mx-auto flex-[1_1_0%] px-5`}
      >
        <OverlayWithClose isOpen={!!detailsId} />
        <header className="py-5">
          <Search searchQuery={savedQuery} onSearch={handleSearch} />
        </header>
        <main className="max-w-[900px] mx-auto">
          {isLoading ? (
            <Spinner />
          ) : 'error' in charactersData ? (
            <ErrorBlock errorText={handleError(charactersData.error)} />
          ) : (
            <>
              <CardList items={items || []} />
              {totalPages && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </main>
      </div>
      <Flyout />
      <div
        className={`${detailsId && 'w-[500px]'} flex p-8 relative justify-center`}
      >
        {detailsId && characterDetails && (
          <>
            {isDetailsLoading ? (
              <Spinner />
            ) : (
              <div className="details-panel-fade flex">
                <DetailsPanel character={characterDetails} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ClientPage;
