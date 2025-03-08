import { Provider } from 'react-redux';
import { getCharacters, store } from './redux';
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router';
import { ThemeProvider } from './providers/ThemeProvider';
import { ErrorBoundary } from './components';
import type { Route } from './+types/root';
import MainPage from './routes/MainPage';
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

    return { charactersData };
  } catch (error) {
    return { error };
  }
}

export default function Root({ loaderData }: Route.ComponentProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <MainPage loaderData={loaderData} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
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
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
