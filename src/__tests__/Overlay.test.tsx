import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OverlayWithClose } from '../components';

describe('OverlayWithClose', () => {
  it('should not render when isOpen is false', () => {
    const { container } = render(
      <OverlayWithClose isOpen={false} onClose={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should call onClose when clicked and render correctly', () => {
    const mockOnClose = vi.fn();
    render(<OverlayWithClose isOpen={true} onClose={mockOnClose} />);

    const overlay = screen.getByRole('presentation');

    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass(
      'absolute',
      'inset-0',
      'bg-black/50',
      'z-20',
      'cursor-pointer'
    );

    fireEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
