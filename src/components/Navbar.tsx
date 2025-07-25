'use client';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
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
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                探索
              </button>
              <button
                onClick={() => setActiveTab('library')}
                className={`px-4 py-2 h-8 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                  activeTab === 'library'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                我的库
              </button>
            </div>
          </div>

          {/* 用户操作 */}
          <div className="flex items-center space-x-4">
            {/* 上传按钮 */}
            <button className="inline-flex items-center px-4 py-2 h-8 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              上传
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button className="bg-gray-200 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 overflow-hidden">
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
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center" style={{display: 'none'}}>
                    <span className="text-white text-sm font-medium">U</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>


    </nav>
  );
}
