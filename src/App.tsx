import { FC } from 'react';
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes';
import { ErrorBoundary } from './components';

const App: FC = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  </BrowserRouter>
);
export default App;
