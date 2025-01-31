import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  handleHideError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col gap-5 justify-center text-center items-center p-6">
          <h2>Something went wrong. Please try again later.</h2>
          <button onClick={this.handleHideError}>Hide Error</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
