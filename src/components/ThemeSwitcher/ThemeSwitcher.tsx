import {
  useTheme,
  useThemeUpdate,
} from '../../providers/ThemeProvider/ThemeContext';
import './style.css';

export const ThemeSwitcher = () => {
  const theme = useTheme();
  const handleToggleTheme = useThemeUpdate();

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={handleToggleTheme}
      />
      <span className="slider"></span>
    </label>
  );
};
