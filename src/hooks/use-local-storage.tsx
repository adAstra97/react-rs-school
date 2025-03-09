import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, defaultValue = '') => {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') return defaultValue;

    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? savedValue : defaultValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return { value, setValue };
};
