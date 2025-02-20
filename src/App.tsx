import { FC } from 'react';
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes';
import { ErrorBoundary } from './components';
import { ThemeProvider } from './providers/ThemeProvider';

const App: FC = () => (
  <ThemeProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
