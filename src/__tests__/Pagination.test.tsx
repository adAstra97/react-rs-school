import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { vi } from 'vitest';
import { Pagination } from '../components';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useSearchParams: vi.fn(() => new URLSearchParams('query=Rick&page=1')),
}));

describe('Pagination', () => {
  it('should update the URL query parameter when page changes', () => {
    const mockPush = vi.fn();
    const mockSearchParams = new URLSearchParams('query=Rick&page=1');

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockImplementation(() => mockSearchParams);

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => {
          const params = new URLSearchParams(mockSearchParams.toString());
          params.set('page', String(page));
          mockPush(`/?${params.toString()}`);
        }}
      />
    );

    const nextButton = screen.getByText('Next ►');
    fireEvent.click(nextButton);

    expect(mockPush).toHaveBeenCalledWith('/?query=Rick&page=2');
  });
});
