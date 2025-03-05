'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const useCloseDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCloseDetails = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('detailsId');

    const newUrl = `/?${newParams.toString()}`;
    router.push(newUrl);
  };

  return handleCloseDetails;
};
