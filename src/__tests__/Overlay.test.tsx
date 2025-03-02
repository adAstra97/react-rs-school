import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OverlayWithClose } from '../components';
import { createMockRouter } from '../utils/test-helper';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';
import { makeStore } from '../redux';

describe('OverlayWithClose', () => {
  let mockedRouter: ReturnType<typeof createMockRouter>;
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    mockedRouter = createMockRouter({
      query: { page: '1', query: 'Rick' },
    });
    store = makeStore();
  });

  it('should not render when isOpen is false', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <RouterContext.Provider value={mockedRouter}>
        <Provider store={store}>{children}</Provider>
      </RouterContext.Provider>
    );

    const { container } = render(<OverlayWithClose isOpen={false} />, {
      wrapper: Wrapper,
    });

    expect(container.firstChild).toBeNull();
  });

  it('should call onClose when clicked and render correctly', () => {
    const mockedRouter = createMockRouter({
      query: { page: '1', query: 'Rick', detailsId: '1' },
    });

    const store = makeStore();

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <RouterContext.Provider value={mockedRouter}>
        <Provider store={store}>{children}</Provider>
      </RouterContext.Provider>
    );

    render(<OverlayWithClose isOpen={true} />, { wrapper: Wrapper });

    const overlay = screen.getByRole('presentation');
    fireEvent.click(overlay);

    expect(mockedRouter.push).toHaveBeenCalledWith(
      {
        pathname: mockedRouter.pathname,
        query: { page: '1', query: 'Rick' },
      },
      undefined,
      { shallow: true }
    );
  });
});
