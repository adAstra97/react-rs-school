import { render, screen, fireEvent } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../utils/test-helper';
import { Pagination } from '../components';

describe('Pagination', () => {
  it('should update the URL query parameter when page changes', () => {
    const mockedRouter = createMockRouter({
      query: { query: 'Rick', page: '1' },
    });

    render(
      <RouterContext.Provider value={mockedRouter}>
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={(page) =>
            mockedRouter.push({
              pathname: mockedRouter.pathname,
              query: { ...mockedRouter.query, page: String(page) },
            })
          }
        />
      </RouterContext.Provider>
    );

    const nextButton = screen.getByText('Next ►');
    fireEvent.click(nextButton);

    expect(mockedRouter.push).toHaveBeenCalledTimes(1);
    expect(mockedRouter.push).toHaveBeenCalledWith({
      pathname: mockedRouter.pathname,
      query: { query: 'Rick', page: '2' },
    });
  });
});
