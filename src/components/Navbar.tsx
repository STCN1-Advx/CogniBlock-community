'use client';

import { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <img 
                  src="/images/logos/CogniBlock_logo.svg" 
                  alt="CogniBlock Logo" 
                  className="h-8 w-auto"
                />
                <span className="ml-4 text-lg font-semibold text-gray-900">社区</span>
              </div>
            </div>
          </div>

          {/* 导航标签 */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => setActiveTab('explore')}
                className={`px-4 py-2 h-8 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                  activeTab === 'explore'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                探索
              </button>
              <button
                onClick={() => setActiveTab('library')}
                className={`px-4 py-2 h-8 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                  activeTab === 'library'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                我的库
              </button>
            </div>
          </div>

          {/* 用户操作 */}
          <div className="flex items-center">
            {/* 桌面端显示上传按钮 */}
            <button className="hidden lg:inline-flex items-center px-4 py-2 h-8 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 mr-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              上传
            </button>
            
            {/* 用户头像和下拉菜单 */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-gray-200 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 overflow-hidden"
              >
                <span className="sr-only">打开用户菜单</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center relative">
                  {/* 支持多种图片格式的用户头像 */}
                  <img 
                    src="/images/avatars/user-avatar.png" 
                    alt="用户头像" 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      // 图片加载失败时显示默认头像
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                  {/* 默认头像 fallback */}
                  <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center" style={{display: 'none'}}>
                    <span className="text-white text-sm font-medium">U</span>
                  </div>
                </div>
              </button>
              
              {/* 下拉菜单 */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // 这里可以添加上传功能
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    上传
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // 这里可以添加账号设置功能
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    账号设置
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


    </nav>
  );
}
