import { Container } from './Container';

export const Header = () => {
  return (
    <div className="py-4.5 bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <Container>
        <h1 className="text-2xl font-bold">Where in the world?</h1>
      </Container>
    </div>
  );
};
