import React from 'react';

export const HomeIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

export const BookOpenIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3v15a3 3 0 003 3h15a3 3 0 003-3V4.5zm-9 13.5H6v-2.25a4.5 4.5 0 019 0V18zm9-1.65a1.5 1.5 0 01-1.5 1.5h-1.5v-3.75a6 6 0 00-12 0V18H4.5a1.5 1.5 0 01-1.5-1.5v-12a1.5 1.5 0 011.5-1.5h15a1.5 1.5 0 011.5 1.5v12z" />
  </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 4h12v2H6V4zm0 3h2v7a3 3 0 003 3h2v2h-2a5 5 0 01-5-5V7zm10 0h2v7a3 3 0 01-3 3h-2v2h2a5 5 0 005-5V7zM8 2h8v1H8V2z" />
  </svg>
);

export const ChartBarIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
  </svg>
);

export const GiftIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
);
