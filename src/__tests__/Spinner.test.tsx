import { render, screen } from '@testing-library/react';
import { Spinner } from '../components';

describe('Spinner component', () => {
  it('should render spinner with overlay', () => {
    render(<Spinner />);

    const spinnerOverlay = screen.getByTestId('spinner');
    expect(spinnerOverlay).toBeInTheDocument();
    expect(spinnerOverlay).toHaveClass('absolute');
    expect(spinnerOverlay).toHaveClass('bg-[rgba(0,0,0,0.1)]');
  });

  it('should have correct positioning classes', () => {
    render(<Spinner />);

    const spinnerOverlay = screen.getByTestId('spinner');
    expect(spinnerOverlay).toHaveClass('flex');
    expect(spinnerOverlay).toHaveClass('justify-center');
    expect(spinnerOverlay).toHaveClass('items-center');
    expect(spinnerOverlay).toHaveClass('inset-0');
  });
});
