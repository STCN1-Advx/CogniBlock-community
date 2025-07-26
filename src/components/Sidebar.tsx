'use client';

import { useState } from 'react';

interface SidebarProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

const categoryGroups = [
  {
    id: 'science',
    name: '理科',
    subcategories: [
      { id: 'math', name: '数学' },
      { id: 'physics', name: '物理' },
      { id: 'chemistry', name: '化学' },
      { id: 'biology', name: '生物' }
    ]
  },
  {
    id: 'liberal-arts',
    name: '文科',
    subcategories: [
      { id: 'chinese', name: '语文' },
      { id: 'english', name: '英语' },
      { id: 'history', name: '历史' },
      { id: 'geography', name: '地理' },
      { id: 'politics', name: '政治' }
    ]
  },
  {
    id: 'technology',
    name: '技术',
    subcategories: [
      { id: 'programming', name: '编程' },
      { id: 'ai', name: '人工智能' },
      { id: 'web-dev', name: 'Web开发' },
      { id: 'mobile-dev', name: '移动开发' }
    ]
  },
  {
    id: 'business',
    name: '商业',
    subcategories: [
      { id: 'marketing', name: '市场营销' },
      { id: 'finance', name: '金融' },
      { id: 'management', name: '管理' },
      { id: 'economics', name: '经济学' }
    ]
  }
];

export default function Sidebar({ selectedCategories, setSelectedCategories, showSidebar, setShowSidebar }: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['science', 'liberal-arts']);

  const toggleCategory = (categoryName: string) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const toggleGroup = (groupId: string) => {
    if (expandedGroups.includes(groupId)) {
      setExpandedGroups(expandedGroups.filter(id => id !== groupId));
    } else {
      setExpandedGroups([...expandedGroups, groupId]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <>
      {/* 移动端遮罩层 */}
       {showSidebar && (
         <div 
           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
           onClick={() => setShowSidebar(false)}
         />
       )}
       
       {/* 侧边栏 */}
       <div className={`w-64 bg-white border-r border-gray-200 fixed left-0 z-50 md:block transition-transform duration-300 ease-in-out ${
         showSidebar ? 'translate-x-0' : '-translate-x-full'
       } md:translate-x-0 top-16 bottom-0`}>
      <div className="h-full overflow-y-auto">
        <div className="p-4 pb-24 md:pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">分类筛选</h2>
          {selectedCategories.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              清除
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          {categoryGroups.map((group) => {
            const isExpanded = expandedGroups.includes(group.id);
            return (
              <div key={group.id} className="border border-gray-200 rounded-lg">
                {/* 大类标题 */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-t-lg transition-all duration-200"
                >
                  <span className="text-sm font-semibold text-gray-800">{group.name}</span>
                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* 小类列表 */}
                {isExpanded && (
                  <div className="px-2 pb-2 space-y-1">
                    {group.subcategories.map((category) => {
                      const isSelected = selectedCategories.includes(category.name);
                      return (
                        <button
                          key={category.id}
                          onClick={() => toggleCategory(category.name)}
                          className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-all duration-200 ${
                            isSelected
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                          }`}
                        >
                          <span className="text-sm font-medium flex-1">{category.name}</span>
                          {isSelected && (
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {selectedCategories.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">已选择的分类</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                >
                  {category}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
      </div>
    </>
  );
}
