'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { ThemeContext } from './ThemeContext';
import { Spinner } from '../../components';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);
  const { value: theme, setValue: setTheme } = useLocalStorage(
    'theme',
    'light'
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  if (!mounted) {
    return (
      <div className="light">
        <Spinner />
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
