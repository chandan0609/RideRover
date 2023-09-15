import React, { useState } from 'react';

function ErrorBoundary(props) {
  const [hasError, setHasError] = useState(false);

  const componentDidCatch = (error, info) => {
    setHasError(true);
    // You can log the error or perform additional error handling here
  };

  if (hasError) {
    // You can render an error message or fallback UI here
    return <div>Something went wrong.</div>;
  }

  return props.children;
}

export default ErrorBoundary;
