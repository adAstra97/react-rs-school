import { Component } from 'react';

interface ErrorButtonState {
  hasError: boolean;
}

class ErrorButton extends Component<unknown, ErrorButtonState> {
  state = { hasError: false };

  throwError = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('An error occurred');
    }

    return (
      <button type="button" onClick={this.throwError} className="button--error">
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
