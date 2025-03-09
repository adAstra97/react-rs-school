import { useState, useEffect, PropsWithChildren } from 'react';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false);
  const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'dark');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  if (!isMounted) {
    return <div className="invisible">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
