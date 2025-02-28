import { FC } from 'react';
import { Route, Routes } from 'react-router';
import MainPage from '../pages/MainPage/MainPage';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="details/:id" element={<DetailsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
