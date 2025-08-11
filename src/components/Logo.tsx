import React from 'react';

export interface LogoProps {
  className?: string;
}

// Simple custom SVG logo: biryani pot with heart steam and brand wordmark
export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={className} aria-label="BiryaniByHearts logo">
      <div className="flex items-center gap-3">
        <svg
          width="40"
          height="40"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="bhGrad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          {/* Pot */}
          <path
            d="M10 28h44c0 8-2 16-10 20-10 5-14 5-24 0C12 44 10 36 10 28Z"
            fill="url(#bhGrad)"
            stroke="#1f2937"
            strokeWidth="1.5"
          />
          {/* Lid */}
          <rect x="14" y="22" width="36" height="6" rx="3" fill="#1f2937" />
          {/* Steam in heart shape */}
          <path
            d="M32 8c-3-4-10-2-10 3 0 6 9 9 10 13 1-4 10-7 10-13 0-5-7-7-10-3Z"
            fill="#ef4444"
          />
        </svg>
        <span className="text-xl font-normal tracking-wide">
          <span className="">Biryani</span>
          <span className="text-amber-600">By</span>
          <span className="text-rose-600">Hearts</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;


