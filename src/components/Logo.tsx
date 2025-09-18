import React from 'react';

export interface LogoProps {
  className?: string;
}

// JayroopInfra logo: simple tile grid mark with brand wordmark
export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={className} aria-label="jayroopinfra logo">
      <div className="flex items-center gap-3">
        <svg
          width="40"
          height="40"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="tileGrad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          {/* Tile grid */}
          <rect x="8" y="8" width="48" height="48" rx="6" fill="url(#tileGrad)" />
          <path d="M32 8v48M8 32h48" stroke="#0b1320" strokeWidth="2" opacity="0.25" />
          <path d="M20 8v48M8 20h48M44 8v48M8 44h48" stroke="#0b1320" strokeWidth="1.2" opacity="0.2" />
        </svg>
        <span className="text-xl font-normal tracking-wide">
          <span className="text-neutral-900">jayroop</span>
          <span className="text-sky-600">infra</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;


