import { MenuItem } from './MenuItem/MenuItem';

const MENU_LIST: Array<Record<string, string>> = [
  { path: '/', name: 'Home' },
  { path: '/controlled', name: 'Controlled Form' },
  { path: '/uncontrolled', name: 'Uncontrolled Form' },
];

export const Menu = () => {
  return (
    <nav className="flex gap-5 flex-wrap">
      {MENU_LIST.map(({ name, path }) => (
        <MenuItem key={name} name={name} path={path} />
      ))}
    </nav>
  );
};
