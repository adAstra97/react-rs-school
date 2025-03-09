import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../providers/ThemeProvider';
import { ErrorBoundary } from '../components';
import { wrapper } from '../redux';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>Next Studing</title>
        <meta
          name="description"
          content="This is my application, written as part of a course on learning React and Next JS"
        />
      </Head>
      <ErrorBoundary>
        <ThemeProvider>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
