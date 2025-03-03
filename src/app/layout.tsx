import type { Metadata } from 'next';
import { ThemeProvider } from '../providers/ThemeProvider';
import { ErrorBoundary } from '../components';
import { ReduxProvider } from '../providers/ReduxProvider';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Next Studing',
  description:
    'This is my application, written as part of a course on learning React and Next JS',
  icons: {
    icon: '/favicon.svg',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
