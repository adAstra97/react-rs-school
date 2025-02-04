import { FC } from 'react';

interface ErrorBlockProps {
  errorText: string;
}

const ErrorBlock: FC<ErrorBlockProps> = ({ errorText }) => {
  return (
    <div className="h-[calc(100vh-200px)] flex justify-center text-center items-center">
      <span className="text-gray-400 text-3xl">{`${errorText} :(`}</span>
    </div>
  );
};

export default ErrorBlock;
