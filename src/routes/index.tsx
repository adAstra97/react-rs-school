import { FC } from 'react';
import { Route, Routes } from 'react-router';
import { DetailsPage, MainPage, NotFoundPage } from '../pages';

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
