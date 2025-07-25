'use client';

import { useState, useRef, useEffect } from 'react';
import { searchFocusAnimation, searchBlurAnimation } from '@/utils/animations';
import KnowledgeCard from './KnowledgeCard';

interface ExploreContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: string[];
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

type SearchType = 'all' | 'cards' | 'knowledge';

const searchTypeOptions = [
  { value: 'all' as SearchType, label: '全部' },
  { value: 'cards' as SearchType, label: '卡片' },
  { value: 'knowledge' as SearchType, label: '知识库' }
];

// 模拟知识库数据
const mockKnowledgeBase = [
  {
    id: '1',
    title: '高中数学函数专题精讲',
    author: '李老师',
    preview: 'math-functions.jpg',
    category: '数学',
    type: 'knowledge' as const,
    description: '详细讲解高中数学函数的性质、图像变换和应用，包含大量例题和解题技巧。',
    views: 1234,
    likes: 89,
    addedDate: '2024-07-20'
  },
  {
    id: '2',
    title: '初中物理力学基础',
    author: '王老师',
    preview: 'physics-mechanics.jpg',
    category: '物理',
    type: 'knowledge' as const,
    description: '从牛顿定律到动量守恒，系统梳理初中物理力学知识点，配有实验演示视频。',
    views: 987,
    likes: 67,
    addedDate: '2024-07-18'
  },
  {
    id: '3',
    title: '有机化学反应机理详解',
    author: '张老师',
    preview: 'chemistry-organic.jpg',
    category: '化学',
    type: 'knowledge' as const,
    description: '高中有机化学重点反应机理分析，包括取代、加成、消除反应的详细过程。',
    views: 2156,
    likes: 145,
    addedDate: '2024-07-15'
  },
  {
    id: '4',
    title: '细胞生物学知识图谱',
    author: '刘老师',
    preview: 'biology-cell.jpg',
    category: '生物',
    type: 'knowledge' as const,
    description: '高中生物细胞结构与功能专题，包含细胞膜、细胞器和细胞分裂的详细讲解。',
    views: 1876,
    likes: 123,
    addedDate: '2024-07-12'
  },
  {
    id: '5',
    title: '古诗词鉴赏技巧大全',
    author: '陈老师',
    preview: 'chinese-poetry.jpg',
    category: '语文',
    type: 'knowledge' as const,
    description: '高考语文古诗词鉴赏答题技巧，涵盖意象分析、情感把握和表现手法识别。',
    views: 1543,
    likes: 98,
    addedDate: '2024-07-10'
  },
  {
    id: '6',
    title: '英语语法时态专项训练',
    author: '赵老师',
    preview: 'english-grammar.jpg',
    category: '英语',
    type: 'knowledge' as const,
    description: '初高中英语16种时态系统讲解，配有练习题和口语应用场景示例。',
    views: 2234,
    likes: 167,
    addedDate: '2024-07-08'
  },
  {
    id: '7',
    title: '中国近代史重点事件梳理',
    author: '孙老师',
    preview: 'history-modern.jpg',
    category: '历史',
    type: 'knowledge' as const,
    description: '从鸦片战争到新中国成立，系统梳理中国近代史重要事件和历史意义。',
    views: 1654,
    likes: 112,
    addedDate: '2024-07-05'
  },
  {
    id: '8',
    title: '世界地理气候类型分析',
    author: '周老师',
    preview: 'geography-climate.jpg',
    category: '地理',
    type: 'knowledge' as const,
    description: '高中地理气候类型特征、分布规律和成因分析，包含典型地区案例研究。',
    views: 1432,
    likes: 95,
    addedDate: '2024-07-03'
  },
  {
    id: '9',
    title: '二次函数图像性质卡片',
    author: '李老师',
    preview: '# 二次函数图像性质\n\n## 基本形式\n**标准形式**: $y = ax^2 + bx + c$ (其中 $a \\neq 0$)\n\n## 关键性质\n- **开口方向**: $a > 0$ 向上，$a < 0$ 向下\n- **对称轴**: $x = -\\frac{b}{2a}$\n- **顶点坐标**: $\\left(-\\frac{b}{2a}, \\frac{4ac-b^2}{4a}\\right)$\n\n## 图像特征\n> 抛物线关于对称轴对称\n\n### 判别式\n设判别式 $\\Delta = b^2 - 4ac$，则：\n- $\\Delta > 0$: 与x轴有两个交点\n- $\\Delta = 0$: 与x轴有一个交点\n- $\\Delta < 0$: 与x轴无交点\n\n### 重要公式\n$$f(x) = a(x - h)^2 + k$$\n其中 $(h, k)$ 为顶点坐标。',
    category: '数学',
    type: 'cards' as const,
    description: '二次函数的开口方向、对称轴、顶点坐标等关键知识点总结卡片。',
    views: 856,
    likes: 45,
    source: 'text' as const
  },
  {
    id: '10',
    title: '牛顿三定律记忆卡片',
    author: '王老师',
    preview: '# 牛顿三定律记忆卡片\n\n## 牛顿第一定律（惯性定律）\n**表述**: 物体在不受外力或所受合外力为零时，保持静止或匀速直线运动状态。\n\n数学表达：当 $\\sum \\vec{F} = 0$ 时，$\\vec{v} = $ 常数\n\n## 牛顿第二定律\n**表述**: 物体的加速度与所受合外力成正比，与质量成反比。\n\n**公式**: $$\\vec{F} = m\\vec{a}$$\n\n或者更一般的形式：$$\\vec{F} = \\frac{d\\vec{p}}{dt}$$\n\n其中 $\\vec{p} = m\\vec{v}$ 为动量。\n\n> **注意**: 力是矢量，方向与加速度方向相同\n\n## 牛顿第三定律（作用反作用定律）\n**表述**: 两个物体间的作用力和反作用力大小相等、方向相反。\n\n数学表达：$$\\vec{F}_{12} = -\\vec{F}_{21}$$\n\n### 应用要点\n1. 同时产生、同时消失\n2. 性质相同\n3. 不能抵消（作用在不同物体上）',
    category: '物理',
    type: 'cards' as const,
    description: '牛顿第一、第二、第三定律的表述和应用要点记忆卡片。',
    views: 723,
    likes: 38,
    source: 'voice' as const
  },
  {
    id: '11',
    title: '化学元素周期表规律卡片',
    author: '张老师',
    preview: 'chemistry-periodic.jpg',
    category: '化学',
    type: 'cards' as const,
    description: '元素周期表中原子半径、电负性、金属性变化规律总结卡片。',
    views: 934,
    likes: 52,
    source: 'image' as const
  },
  {
    id: '12',
    title: '英语不规则动词变化卡片',
    author: '赵老师',
    preview: 'english-verbs.jpg',
    category: '英语',
    type: 'cards' as const,
    description: '常用不规则动词的过去式和过去分词变化规律记忆卡片。',
    views: 1245,
    likes: 67,
    source: 'shared' as const
  },
  {
    id: '13',
    title: '化学实验记录',
    author: '化学老师',
    preview: 'chemistry-experiment.jpg',
    category: '化学',
    description: '化学实验的详细记录和观察心得',
    views: 89,
    likes: 23,
    type: 'cards' as const,
    source: 'text' as const,
    addedDate: '2024-07-01'
  },
  {
    id: '14',
    title: '英语单词记忆法',
    author: '英语老师',
    preview: 'english-memory.jpg',
    category: '英语',
    description: '高效的英语单词记忆技巧分享',
    views: 156,
    likes: 45,
    type: 'cards' as const,
    source: 'voice' as const,
    addedDate: '2024-06-28'
  },
  {
    id: '15',
    title: '历史时间轴整理',
    author: '历史老师',
    preview: 'history-timeline.jpg',
    category: '历史',
    description: '中国古代历史重要事件梳理',
    views: 134,
    likes: 38,
    type: 'cards' as const,
    source: 'image' as const,
    addedDate: '2024-06-25'
  },
  {
    id: '16',
    title: '地理笔记摘要',
    author: '地理老师',
    preview: 'geography-notes.jpg',
    category: '地理',
    description: '世界气候类型分布规律总结',
    views: 98,
    likes: 27,
    type: 'cards' as const,
    source: 'shared' as const,
    addedDate: '2024-06-22'
  },
  {
    id: '17',
    title: '物理公式推导',
    author: '物理老师',
    preview: 'physics-formula.jpg',
    category: '物理',
    description: '经典物理公式的详细推导过程',
    views: 167,
    likes: 52,
    type: 'cards' as const,
    source: 'text' as const,
    addedDate: '2024-06-20'
  },
  {
    id: '18',
    title: '生物细胞结构图',
    author: '生物老师',
    preview: 'biology-cell.jpg',
    category: '生物',
    description: '细胞结构对比分析',
    views: 143,
    likes: 41,
    type: 'cards' as const,
    source: 'image' as const,
    addedDate: '2024-06-18'
  }
];

export default function ExploreContent({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  showSidebar,
  setShowSidebar
}: ExploreContentProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [filteredKnowledge, setFilteredKnowledge] = useState(mockKnowledgeBase);
  const [searchType, setSearchType] = useState<SearchType>('all');

  const handleSearchFocus = () => {
    if (searchInputRef.current) {
      searchFocusAnimation(searchInputRef.current);
    }
  };

  const handleSearchBlur = () => {
    if (searchInputRef.current) {
      searchBlurAnimation(searchInputRef.current);
    }
  };

  useEffect(() => {
    let filtered = mockKnowledgeBase;

    // 根据搜索类型过滤
    if (searchType !== 'all') {
      filtered = filtered.filter(item => item.type === searchType);
    }

    // 根据搜索查询过滤
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 根据选中的分类过滤
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item =>
        selectedCategories.includes(item.category)
      );
    }

    setFilteredKnowledge(filtered);
  }, [searchQuery, selectedCategories, searchType]);

  return (
    <div className="space-y-6">
      {/* 标题 - 移动端在上方，桌面端在左侧 */}
      <div className="md:hidden mb-4">
        <h1 className="text-2xl font-bold text-gray-900">探索知识库</h1>
      </div>
      
      {/* 搜索栏 */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-2xl font-bold text-gray-900">探索知识库</h1>
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
              ref={searchInputRef}
              type="text"
              placeholder="搜索知识库..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
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
        <span>
          找到 {filteredKnowledge.length} 个
          {searchType === 'all' ? '结果' : searchType === 'cards' ? '卡片' : '知识库'}
        </span>
        {(searchQuery || selectedCategories.length > 0 || searchType !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSearchType('all');
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            清除搜索
          </button>
        )}
      </div>

      {/* 知识库网格 */}
      {filteredKnowledge.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {filteredKnowledge.map((item) => (
            <div key={item.id} className="w-full max-w-xs mx-auto">
              <KnowledgeCard {...item} type={item.type} />
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            没有找到相关{searchType === 'all' ? '内容' : searchType === 'cards' ? '卡片' : '知识库'}
          </h3>
          <p className="text-gray-500">尝试调整搜索条件或浏览其他分类</p>
        </div>
      )}
    </div>
  );
}
