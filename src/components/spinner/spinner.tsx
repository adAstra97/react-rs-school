import { FC } from 'react';
import SpinnerIcon from '../../assets/icons/spinner.svg';

export const Spinner: FC = () => {
  return (
    <div
      data-testid="spinner"
      className="absolute flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.1)]"
    >
      <img src={SpinnerIcon} alt="loading" />
    </div>
  );
};
