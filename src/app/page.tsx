'use client';

import { useState, useEffect } from 'react';
import { pageLoadAnimation } from '@/utils/animations';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ExploreContent from '@/components/ExploreContent';
import MyLibrary from '@/components/MyLibrary';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // 页面加载动画
    const timer = setTimeout(() => {
      pageLoadAnimation();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />
      
      <div className="flex">
        <Sidebar 
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        
        <main className="flex-1 min-h-screen md:ml-64 pb-24 md:pb-0">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {activeTab === 'explore' && (
              <ExploreContent 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategories={selectedCategories}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
            )}
            {activeTab === 'library' && (
              <MyLibrary 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategories={selectedCategories}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
            )}
          </div>
        </main>
      </div>
      
      {/* 底部导航条 (仅移动端显示) */}
      <BottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
