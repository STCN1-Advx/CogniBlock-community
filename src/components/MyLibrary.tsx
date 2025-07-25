'use client';

import { useState, useEffect } from 'react';
import KnowledgeCard from './KnowledgeCard';

// 我的库模拟数据
const mockMyLibrary = [
  {
    id: '1',
    title: '二次函数知识点总结',
    author: '我',
    preview: '二次函数的基本形式：y = ax² + bx + c\n开口方向：a > 0 开口向上，a < 0 开口向下\n对称轴：x = -b/2a',
    category: '数学',
    description: '二次函数的开口方向、对称轴、顶点坐标等关键知识点总结。',
    views: 156,
    likes: 23,
    type: 'cards' as const,
    source: 'text' as const,
    addedDate: '2024-07-20'
  },
  {
    id: '2',
    title: '高中物理力学基础',
    author: '物理老师',
    preview: 'physics-mechanics.jpg',
    category: '物理',
    description: '包含牛顿三大定律、运动学公式、力的分析等核心内容的完整知识库。',
    views: 1234,
    likes: 89,
    type: 'knowledge' as const,
    addedDate: '2024-07-18'
  },
  {
    id: '3',
    title: '化学实验安全注意事项',
    author: '我',
    preview: '实验前准备：\n1. 检查实验器材是否完好\n2. 穿戴好防护用品\n3. 了解实验步骤和安全措施',
    category: '化学',
    description: '化学实验室安全规范和注意事项整理。',
    views: 89,
    likes: 15,
    type: 'cards' as const,
    source: 'voice' as const,
    addedDate: '2024-07-15'
  },
  {
    id: '4',
    title: '英语语法大全',
    author: '英语老师',
    preview: 'english-grammar.jpg',
    category: '英语',
    description: '涵盖高中阶段所有重要语法点的综合性知识库。',
    views: 2156,
    likes: 234,
    type: 'knowledge' as const,
    addedDate: '2024-07-12'
  },
  {
    id: '5',
    title: '古诗词鉴赏技巧',
    author: '我',
    preview: '古诗词鉴赏步骤：\n1. 理解诗词大意\n2. 分析表现手法\n3. 体会情感主题\n4. 品味语言特色',
    category: '语文',
    description: '古诗词鉴赏的方法和技巧总结。',
    views: 167,
    likes: 28,
    type: 'cards' as const,
    source: 'image' as const,
    addedDate: '2024-07-10'
  }
];

type SearchType = 'all' | 'cards' | 'knowledge';

interface MyLibraryProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: string[];
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

export default function MyLibrary({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  showSidebar,
  setShowSidebar
}: MyLibraryProps) {
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [filteredLibrary, setFilteredLibrary] = useState(mockMyLibrary);
  // 搜索类型选项
  const searchTypeOptions = [
    { value: 'all' as const, label: '全部' },
    { value: 'cards' as const, label: '卡片' },
    { value: 'knowledge' as const, label: '知识库' }
  ];

  useEffect(() => {
    let filtered = mockMyLibrary;

    // 根据搜索查询过滤
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 根据分类过滤
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item =>
        selectedCategories.includes(item.category)
      );
    }

    // 根据搜索类型过滤
    if (searchType !== 'all') {
      filtered = filtered.filter(item => item.type === searchType);
    }

    setFilteredLibrary(filtered);
  }, [searchQuery, selectedCategories, searchType]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchType('all');
  };

  const getResultText = () => {
    const typeText = searchType === 'all' ? '内容' : searchType === 'cards' ? '卡片' : '知识库';
    return `找到 ${filteredLibrary.length} 个${typeText}`;
  };

  const getEmptyText = () => {
    const typeText = searchType === 'all' ? '内容' : searchType === 'cards' ? '卡片' : '知识库';
    return `没有找到相关${typeText}`;
  };

  return (
    <div className="space-y-6">
      {/* 标题 - 移动端在上方，桌面端在左侧 */}
      <div className="md:hidden mb-4">
        <h1 className="text-2xl font-bold text-gray-900">我的知识库</h1>
      </div>
      
      {/* 搜索栏 */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-2xl font-bold text-gray-900">我的知识库</h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* 筛选器切换按钮 (仅在移动端显示) */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex-shrink-0"
            title="切换筛选器"
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
          
          {/* 搜索框 */}
          <div className="relative flex-1 md:w-80 md:flex-none">
            <input
              type="text"
              placeholder="搜索我的知识库..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
        </div>
      </div>

      {/* 搜索类型分段控件 */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          {searchTypeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSearchType(option.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                searchType === option.value
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 结果统计 */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{getResultText()}</span>
        {(searchQuery || selectedCategories.length > 0 || searchType !== 'all') && (
          <button
            onClick={handleClearSearch}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            清除搜索
          </button>
        )}
      </div>

      {/* 内容网格 */}
      {filteredLibrary.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredLibrary.map((item) => (
            <div key={item.id} className="w-full max-w-xs mx-auto">
              <KnowledgeCard {...item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{getEmptyText()}</h3>
          <p className="text-gray-500">尝试调整搜索条件或浏览其他分类</p>
        </div>
      )}
    </div>
  );
}