'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TestErrorsPage() {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Test pages are only available in development mode</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🧪 Test Error Pages
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">404 Not Found Tests</h2>
          <div className="space-y-3">
            <Link href="/non-existent-page">
              <Button variant="outline" className="w-full justify-start">
                📄 Visit non-existent page directly
              </Button>
            </Link>
            <Link href="/api/test/404">
              <Button variant="outline" className="w-full justify-start">
                🔗 Trigger 404 via API route
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">500 Error Tests (Rendering Errors)</h2>
          <p className="text-sm text-gray-600 mb-4">These will trigger your custom error.tsx boundary:</p>
          <div className="space-y-3">
            <Link href="/test-errors/500">
              <Button variant="outline" className="w-full justify-start">
                ⚠️ Generic rendering error
              </Button>
            </Link>
            <Link href="/test-errors/500?type=database">
              <Button variant="outline" className="w-full justify-start">
                🗄️ Database error simulation
              </Button>
            </Link>
            <Link href="/test-errors/500?type=auth">
              <Button variant="outline" className="w-full justify-start">
                🔐 Authentication error simulation
              </Button>
            </Link>
            <Link href="/test-errors/500?type=network">
              <Button variant="outline" className="w-full justify-start">
                🌐 Network timeout simulation
              </Button>
            </Link>
            <Link href="/test-errors/500?type=validation">
              <Button variant="outline" className="w-full justify-start">
                ✅ Validation error simulation
              </Button>
            </Link>
            <Link href="/test-errors/500?type=component">
              <Button variant="outline" className="w-full justify-start">
                🧩 Component rendering error
              </Button>
            </Link>
            <Link href="/test-errors/500?type=async">
              <Button variant="outline" className="w-full justify-start">
                ⏳ Async operation error
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">API Route Errors (Browser Error Screen)</h2>
          <p className="text-sm text-gray-600 mb-4">These show browser error screens, not your custom error.tsx:</p>
          <div className="space-y-3">
            <Link href="/api/test/500">
              <Button variant="outline" className="w-full justify-start">
                📡 API Generic error
              </Button>
            </Link>
            <Link href="/api/test/500?type=database">
              <Button variant="outline" className="w-full justify-start">
                📡 API Database error
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              🏡 Back to Home
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This page and test routes are only available in development mode. 
            They will return 403 Forbidden in production.
          </p>
        </div>
      </div>
    </div>
  );
}