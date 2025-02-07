import { FC } from 'react';
import { Link } from 'react-router';

const NotFoundPage: FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-4 inline-block text-blue-500">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
