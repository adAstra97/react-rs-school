import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useDetailsLoader = (isFetching: boolean, detailsId: string) => {
  const router = useRouter();

  const [showLoader, setShowLoader] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (detailsId && (initialLoad || isFetching)) {
      setShowLoader(true);
      timer = setTimeout(() => setShowLoader(false), 500);
    }

    return () => {
      clearTimeout(timer);
      if (!detailsId) setInitialLoad(true);
    };
  }, [detailsId, isFetching, initialLoad]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!url.includes('detailsId')) {
        setInitialLoad(true);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return showLoader;
};
