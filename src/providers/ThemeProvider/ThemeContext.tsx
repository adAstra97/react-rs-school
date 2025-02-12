import { createContext, useContext } from 'react';

export const ThemeStateContext = createContext('dark');
export const ThemeDispatchContext = createContext<() => void>(() => {});

export const useTheme = () => useContext(ThemeStateContext);
export const useThemeUpdate = () => useContext(ThemeDispatchContext);
