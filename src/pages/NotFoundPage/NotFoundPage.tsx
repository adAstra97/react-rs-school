import { FC } from 'react';
import { Link } from 'react-router';
import Image from 'next/image';

const NotFoundPage: FC = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center gap-10 min-h-screen bg-mainBackground">
      <span className="text-9xl font-bold text-amber-500">404</span>
      <span className="text-amber-500 text-2xl">
        The page you are looking for does not exist.
      </span>
      <Link to="/">
        <Image
          width={100}
          height={100}
          src="/assets/icons/house.svg"
          alt="home"
        />
      </Link>
    </div>
  );
};

export default NotFoundPage;
