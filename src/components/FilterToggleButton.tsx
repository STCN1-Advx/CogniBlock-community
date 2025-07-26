'use client';

import React from 'react';

interface FilterToggleButtonProps {
  onClick: () => void;
  className?: string;
  title?: string;
}

export default function FilterToggleButton({
  onClick,
  className = "",
  title = "切换筛选器"
}: FilterToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`md:hidden p-2 border border-gray-200 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex-shrink-0 ${className}`}
      title={title}
    >
      <svg
        className="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
    </button>
  );
}