import { useState } from 'react';

const ErrorButton = () => {
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

export default ErrorButton;
