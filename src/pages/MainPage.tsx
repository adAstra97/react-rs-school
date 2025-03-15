import { useLocation } from 'react-router';
import { Card } from '../components/Card/Card';
import { useAppSelector } from '../redux/hooks';
import { useEffect, useState } from 'react';

type LocationState = {
  formCreated?: boolean;
};

const MainPage = () => {
  const allForms = useAppSelector((state) => state.forms);
  const [isHighlight, setIsHighlight] = useState(false);
  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    if (state?.formCreated) {
      setIsHighlight(true);
      const timer = setTimeout(() => setIsHighlight(false), 5000);

      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <main className="py-8">
      {allForms.length > 0 ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          {allForms.map((item, index) => (
            <Card
              key={index}
              item={item}
              classes={
                index === 0 && isHighlight
                  ? 'shadow-[-0px_0px_40px_rgb(35,183,224)] !border-[rgb(44,140,167)]'
                  : ''
              }
            />
          ))}
        </ul>
      ) : (
        <span>No forms found</span>
      )}
    </main>
  );
};

export default MainPage;
