import { Component } from 'react';
import spinner from '/spinner.svg';

class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <img src={spinner} alt="loading" />
      </div>
    );
  }
}

export default Spinner;
