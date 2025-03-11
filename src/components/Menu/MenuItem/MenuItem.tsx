import { NavLink } from 'react-router';

interface Props {
  path: string;
  name: string;
}

export const MenuItem = ({ path, name }: Props) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? 'text-grey [text-shadow:_0_1px_2px_#edfff5]'
          : 'text-blue hover:text-grey transition-colors'
      }
    >
      {name}
    </NavLink>
  );
};
