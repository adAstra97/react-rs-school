import { Route, Routes } from 'react-router';
import MainPage from '../pages/MainPage';
import ControlledFormPage from '../pages/ControlledFormPage';
import NotFoundPage from '../pages/NotFoundPage';
import UncontrolledFormPage from '../pages/UncontrolledFormPage';
import { Layout } from '../components';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/controlled" element={<ControlledFormPage />} />
        <Route path="/uncontrolled" element={<UncontrolledFormPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
