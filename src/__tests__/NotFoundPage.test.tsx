import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NotFoundPage from '../pages/NotFoundPage';

describe('NotFoundPage', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
        assign: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
    });
  });

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

  it('should redirect to home page when click home button', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const homeButton = screen.getByRole('img', { name: /home/i });
    fireEvent.click(homeButton);

    expect(window.location.href).toBe('/');
  });
});
