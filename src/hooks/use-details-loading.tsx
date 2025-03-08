import { useEffect, useState } from 'react';

export const useDetailsLoading = (trigger: string | null) => {
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsDetailsLoading(true);
      const timer = setTimeout(() => {
        setIsDetailsLoading(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return isDetailsLoading;
};
