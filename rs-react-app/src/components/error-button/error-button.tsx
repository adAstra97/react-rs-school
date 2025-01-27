import { Component } from 'react';

class ErrorButton extends Component {
  render() {
    return (
      <button type="button" className="button--error">
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
