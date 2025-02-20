import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AppRoutes from '../routes';
import { store } from '../redux';
import { Provider } from 'react-redux';

describe('AppRoutes', () => {
  it('should render MainPage for root route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should render NotFoundPage for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });
});
