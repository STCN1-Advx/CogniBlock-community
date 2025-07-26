'use client';

import React, { useRef } from 'react';
import { searchFocusAnimation, searchBlurAnimation } from '@/utils/animations';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  enableAnimation?: boolean;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "搜索...",
  className = "",
  enableAnimation = false
}: SearchInputProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchFocus = () => {
    if (enableAnimation && searchInputRef.current) {
      searchFocusAnimation(searchInputRef.current);
    }
  };

  const handleSearchBlur = () => {
    if (enableAnimation && searchInputRef.current) {
      searchBlurAnimation(searchInputRef.current);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={searchInputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        className="w-full pl-10 pr-4 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}