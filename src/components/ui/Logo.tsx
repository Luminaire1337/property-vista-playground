import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

// Main logo component for use in React
export function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <div 
      className={`bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.625} // 5/8 ratio like the original w-5 h-5 in w-8 h-8
        height={size * 0.625}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 12L5 10L12 3L19 10L21 12M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Pure SVG logo for favicon and other static uses
export function LogoSVG({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="6" fill="url(#logoGradient)" />
      <path
        d="M8 16L10 14L16 8L22 14L24 16M10 14V24C10 24.5523 10.4477 25 11 25H14M22 14V24C22 24.5523 21.5523 25 21 25H18M14 25C14.5523 25 15 24.5523 15 24V20C15 19.4477 15.4477 19 16 19H16C16.5523 19 17 19.4477 17 20V24C17 24.5523 17.4477 25 18 25M14 25H18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}