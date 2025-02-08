import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useSearchParams } from 'react-router';
import { Pagination } from '../components';

const MockPagination = ({
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

describe('Pagination', () => {
  it('should update the URL query parameter when page changes', async () => {
    render(
      <BrowserRouter>
        <MockPagination currentPage={1} totalPages={3} />
      </BrowserRouter>
    );

    const nextButton = screen.getByText('Next ►');
    const prevButton = screen.getByText('◄ Prev');

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(location.search).toBe('?page=3');
  });
});
