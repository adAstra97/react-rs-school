import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ErrorBoundary } from '../components';

const ErrorComponent = () => {
  throw new Error('Test error');
};

const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('ErrorBoundary', () => {
  it('should show error message when children throw error', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /hide error/i })
    ).toBeInTheDocument();
  });
});
