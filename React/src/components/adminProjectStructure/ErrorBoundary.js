import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 에러 발생 시 상태 업데이트
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅 등을 할 수 있음
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
