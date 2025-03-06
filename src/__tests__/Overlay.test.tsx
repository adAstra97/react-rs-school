import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OverlayWithClose } from '../components';
import { Provider } from 'react-redux';
import { makeStore } from '../redux';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { ReadonlyURLSearchParams } from 'next/navigation';

const mockPush = vi.fn();
const mockRouter: AppRouterInstance = {
  push: mockPush,
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: (): ReadonlyURLSearchParams => {
    const params = new URLSearchParams('page=1&query=Rick&detailsId=1');
    return params as ReadonlyURLSearchParams;
  },
}));

describe('OverlayWithClose', () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    store = makeStore();
    vi.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(
      <Provider store={store}>
        <OverlayWithClose isOpen={false} />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should call onClose when clicked and update URL', () => {
    render(
      <Provider store={store}>
        <OverlayWithClose isOpen={true} />
      </Provider>
    );

    const overlay = screen.getByRole('presentation');
    fireEvent.click(overlay);

    expect(mockPush).toHaveBeenCalledWith('/?page=1&query=Rick');
  });
});
