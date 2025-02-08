import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { NotFoundPage } from '../pages';

describe('NotFoundPage', () => {
  it('should show 404 page for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/det']}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
