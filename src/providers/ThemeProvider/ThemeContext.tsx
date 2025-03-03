'use client';

import { createContext, useContext } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'lignt',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext).theme;
export const useThemeUpdate = () => useContext(ThemeContext).toggleTheme;
