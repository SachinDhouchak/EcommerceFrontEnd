import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}

export default ErrorBoundary;
