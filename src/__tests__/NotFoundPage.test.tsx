import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Page404 from '../app/not-found';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/test'),
}));

describe('Error pages', () => {
  it('should show 404 page for unknown route', () => {
    render(<Page404 />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
