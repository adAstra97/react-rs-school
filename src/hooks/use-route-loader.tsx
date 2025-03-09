import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useRouteLoader = () => {
  const router = useRouter();
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      const newUrl = new URL(url, window.location.origin);
      const hasDetailsId = newUrl.searchParams.has('detailsId');

      if (!hasDetailsId) {
        setIsRouteChanging(true);
      }
    };

    const handleRouteChangeComplete = () => {
      setIsRouteChanging(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  return isRouteChanging;
};
