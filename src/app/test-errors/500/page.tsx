'use client';

import { useEffect, useState } from 'react';

export default function Test500Page() {
  const [errorType, setErrorType] = useState('generic');
  const [shouldThrow, setShouldThrow] = useState(false);

  useEffect(() => {
    // Only allow in development
    if (process.env.NODE_ENV !== 'development') {
      throw new Error('Test pages are only available in development mode');
    }
    
    // Get error type from URL params on client side only
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') || 'generic';
    setErrorType(type);
    setShouldThrow(true); // Only throw after client-side hydration
  }, []);

  // Only throw errors after component has mounted on client
  if (shouldThrow) {
    // These will be caught by the error.tsx boundary
    switch (errorType) {
    case 'database':
      throw new Error('Database connection failed - Rendering error from PropertyVista');
    case 'auth':
      throw new Error('Authentication failed - Rendering error from PropertyVista');
    case 'network':
      throw new Error('Network timeout - Rendering error from PropertyVista');
    case 'validation':
      throw new Error('Invalid data format - Rendering error from PropertyVista');
    case 'component':
      // Simulate a component that fails to render
      const data = null;
      // @ts-expect-error - Intentionally causing error for testing
      return <div>{data.nonExistentProperty}</div>; // This will throw
    case 'async':
      // Simulate async operation failure
      throw new Error('Failed to load async data - Rendering error from PropertyVista');
    default:
      throw new Error('Something went wrong during rendering - Test error from PropertyVista');
    }
  }

  // Show loading state until ready to throw error
  return <div className="p-8">Preparing error test...</div>;
}