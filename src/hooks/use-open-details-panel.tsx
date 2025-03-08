import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export const useOpenDetailsPanel = () => {
  const params = useParams();
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

  useEffect(() => {
    if (params.detailsId) {
      setIsOpenDetails(true);
    } else {
      setIsOpenDetails(false);
    }
  }, [params.detailsId]);

  return isOpenDetails;
};
