import { notFound } from "next/navigation";

export async function GET() {
  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return Response.json(
      { error: 'Test routes are only available in development mode' }, 
      { status: 403 }
    );
  }

  // Trigger 404 - this will show the not-found.tsx page
  notFound();
}