import { Container } from '../Container/Container';
import { Menu } from '../Menu/Menu';

export const Header = () => {
  return (
    <header className="py-3 px-4 border-b-2 border-grey">
      <Container>
        <Menu />
      </Container>
    </header>
  );
};
