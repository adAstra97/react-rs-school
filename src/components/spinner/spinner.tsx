import { Component } from 'react';
import SpinnerIcon from '../../assets/icons/spinner.svg';

class Spinner extends Component {
  render() {
    return (
      <div className="absolute flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.50)]">
        <SpinnerIcon />
      </div>
    );
  }
}

export default Spinner;
