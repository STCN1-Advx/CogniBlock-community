'use client';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="md:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-gray-200/50 px-2 py-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center py-2.5 px-5 min-w-[70px] rounded-full transition-all duration-300 transform ${
              activeTab === 'explore'
                ? 'text-primary-500 bg-primary-100 scale-105'
                : 'text-gray-600 hover:text-primary-500 hover:bg-primary-50 hover:scale-105'
            }`}
          >
            <svg
              className="w-4 h-4 mb-1"
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
            <span className="text-xs font-medium">探索</span>
          </button>
          
          <button
            onClick={() => setActiveTab('library')}
            className={`flex flex-col items-center py-2.5 px-5 min-w-[80px] rounded-full transition-all duration-300 transform ${
              activeTab === 'library'
                ? 'text-primary-500 bg-primary-100 scale-105'
                : 'text-gray-600 hover:text-primary-500 hover:bg-primary-50 hover:scale-105'
            }`}
          >
            <svg
              className="w-4 h-4 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span className="text-xs font-medium">我的库</span>
          </button>
        </div>
      </div>
    </div>
  );
}