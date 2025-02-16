import { PropsWithChildren } from 'react';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
