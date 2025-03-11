import { Outlet } from 'react-router';
import { Header } from '../Header/Header';
import { Container } from '../Container/Container';

export const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};
