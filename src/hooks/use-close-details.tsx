import { useRouter } from 'next/router';

export const useCloseDetails = () => {
  const router = useRouter();

  const handleCloseDetails = () => {
    if (router.query.detailsId) {
      const updatedQuery = { ...router.query };
      delete updatedQuery.detailsId;

      router.push({ pathname: router.pathname, query: updatedQuery });
    }
  };

  return handleCloseDetails;
};
