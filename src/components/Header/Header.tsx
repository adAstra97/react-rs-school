import { NavLink } from 'react-router';

export const Header = () => {
  return (
    <header className="py-3 px-4 border-b-2 border-grey">
      <nav className="flex gap-5 flex-wrap">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-grey [text-shadow:_0_1px_2px_#edfff5]'
              : 'text-blue hover:text-grey transition-colors'
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/controlled"
          className={({ isActive }) =>
            isActive
              ? 'text-grey [text-shadow:_0_1px_2px_#edfff5]'
              : 'text-blue hover:text-grey transition-colors'
          }
        >
          Controlled Form
        </NavLink>

        <NavLink
          to="/uncontrolled"
          className={({ isActive }) =>
            isActive
              ? 'text-grey [text-shadow:_0_1px_2px_#edfff5]'
              : 'text-blue hover:text-grey transition-colors'
          }
        >
          Uncontrolled Form
        </NavLink>
      </nav>
    </header>
  );
};
