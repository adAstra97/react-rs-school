import { Card } from '../components/Card/Card';
import { useAppSelector } from '../redux/hooks';

const MainPage = () => {
  const allForms = useAppSelector((state) => state.forms);

  return (
    <main className="py-8">
      {allForms.length > 0 ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          {allForms.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </ul>
      ) : (
        <span>No forms found</span>
      )}
    </main>
  );
};

export default MainPage;
