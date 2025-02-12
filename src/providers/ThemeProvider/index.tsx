import { PropsWithChildren, useCallback, useEffect } from 'react';
import { ThemeDispatchContext, ThemeStateContext } from './ThemeContext';
import { useLocalStorage } from '../../hooks/use-local-storage';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'dark');

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark', theme === 'dark');
    htmlElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={toggleTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};
