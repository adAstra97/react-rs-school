import { FC, useState } from 'react';

export const ErrorButton: FC = () => {
  const [hasError, setHasError] = useState(false);

  const throwError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('An error occurred');
  }

  return (
    <button
      type="button"
      onClick={throwError}
      className="fixed right-10 bottom-10 text-lg"
    >
      Throw Error
    </button>
  );
};
