import React from 'react';

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // 에러 발생 시 상태 업데이트
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     const additionalStateInfo = {
//       props:this.props
//     };
//     // 에러 로깅 등을 할 수 있음
//     console.error("Uncaught error:", error, errorInfo,additionalStateInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <h2>Something went wrong. Please try again later.</h2>;
//     }

//     return this.props.children; 
//   }
// }
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 모든 에러를 무시하고 렌더링 유지
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러를 무시하는 대신 콘솔에 경고만 남김
    console.warn('An error occurred:', error);
    console.warn('Error details:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.children; // 여전히 자식 컴포넌트를 렌더링
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
