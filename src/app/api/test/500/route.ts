import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return Response.json(
      { error: 'Test routes are only available in development mode' }, 
      { status: 403 }
    );
  }

  // Simulate different types of errors based on query parameter
  const url = new URL(request.url);
  const errorType = url.searchParams.get('type') || 'generic';

  switch (errorType) {
    case 'database':
      throw new Error('Database connection failed - Test error from PropertyVista');
    case 'auth':
      throw new Error('Authentication failed - Test error from PropertyVista');
    case 'network':
      throw new Error('Network timeout - Test error from PropertyVista');
    case 'validation':
      throw new Error('Invalid data format - Test error from PropertyVista');
    default:
      throw new Error('Something went wrong - Test error from PropertyVista');
  }
}