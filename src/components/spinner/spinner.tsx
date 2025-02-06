import { FC } from 'react';
import SpinnerIcon from '../../assets/icons/spinner.svg';

const Spinner: FC = () => {
  return (
    <div className="absolute flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.1)]">
      <img src={SpinnerIcon} alt="loading" />
    </div>
  );
};

export default Spinner;
