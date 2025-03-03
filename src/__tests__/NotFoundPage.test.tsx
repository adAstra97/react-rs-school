import { render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../utils/test-helper';
import Custom500 from '../page-last/500';
import NotFoundPage from '../page-last/404';

describe('Error pages', () => {
  it('should show 404 page for unknown route', () => {
    const mockedRouter = createMockRouter({ pathname: '/det' });

    render(
      <RouterContext.Provider value={mockedRouter}>
        <NotFoundPage />
      </RouterContext.Provider>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('should display a 500 error message', () => {
    render(<Custom500 />);

    expect(screen.getByText('500')).toBeInTheDocument();
  });
});
