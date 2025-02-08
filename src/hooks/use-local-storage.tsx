import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, defaultValue = '') => {
  const [value, setValue] = useState<string>(() => {
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? savedValue : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return { value, setValue };
};
