import { Provider } from 'react-redux';
import { getCharacters, store } from './redux';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from 'react-router';
import { ThemeProvider } from './providers/ThemeProvider';
import MainPage from './pages/MainPage';
import { ThemeSwitcher } from './components';
import NotFoundPage from './pages/NotFoundPage';
import { Route } from './+types/root';
import './index.css';

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('query') || '';
    const currentPage = Number(url.searchParams.get('page')) || 1;
    const charactersData = await store
      .dispatch(
        getCharacters.initiate({ name: searchQuery, page: currentPage })
      )
      .unwrap();

    return { charactersData, searchQuery, currentPage };
  } catch (error) {
    return { error };
  }
}

export default function Root({ loaderData }: Route.ComponentProps) {
  return <MainPage loaderData={loaderData} />;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React Router Framework | Learning</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <ThemeSwitcher />
        <NotFoundPage />
      </>
    );
  }
}
