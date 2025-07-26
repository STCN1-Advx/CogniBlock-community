'use client';

import React, { useState } from 'react';
import { useRef } from 'react';
import { cardHoverAnimation, cardLeaveAnimation, buttonClickAnimation } from '@/utils/animations';
import DetailModal from './DetailModal';

interface KnowledgeCardProps {
  id: string;
  title: string;
  author: string;
  preview: string;
  category: string;
  type: 'knowledge' | 'cards';
  description: string;
  views: number;
  likes: number;
  source?: 'image' | 'voice' | 'text' | 'shared';
  addedDate?: string;
}

// 根据卡片来源获取状态颜色
const getCardStatusColor = (source?: string): string => {
  switch (source) {
    case 'image':
      return 'bg-blue-500'; // 蓝色：图片生成
    case 'voice':
      return 'bg-green-500'; // 绿色：语音输入
    case 'text':
      return 'bg-purple-500'; // 紫色：文本输入
    case 'shared':
      return 'bg-yellow-500'; // 黄色：其他用户卡片
    default:
      return 'bg-gray-500';
  }
};

export default function KnowledgeCard(props: KnowledgeCardProps) {
  const {
    id,
    title,
    author,
    preview,
    category,
    type,
    description,
    views,
    likes,
    source
  } = props;
  
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const uploadButtonRef = useRef<HTMLButtonElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardHoverAnimation(cardRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardLeaveAnimation(cardRef.current);
    }
  };

  const handleUploadClick = () => {
    if (uploadButtonRef.current) {
      buttonClickAnimation(uploadButtonRef.current);
    }
  };

  const handleAddClick = () => {
    if (addButtonRef.current) {
      buttonClickAnimation(addButtonRef.current);
    }
  };

  return (
    <>
      <div 
        ref={cardRef}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsDetailOpen(true)}
      >
      
      <div className="flex-1">
        {type === 'knowledge' ? (
          // 知识库样式 - 保持原有设计
          <>
            {/* 预览区域 */}
            <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            
            {/* 内容区域 */}
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                {title}
              </h3>
              
              <div className="mb-3">
                <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium">
                  {category}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-gray-500">
                      {author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="truncate max-w-20">{author}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <button 
                    ref={uploadButtonRef}
                    onClick={handleUploadClick}
                    className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                    title="查看"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button 
                    ref={addButtonRef}
                    onClick={handleAddClick}
                    className="px-3 py-1.5 bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors text-sm font-medium flex items-center gap-1"
                    title="添加到知识库"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>添加</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // 卡片样式 - 新的设计，类似图片中的样式
          <div className="p-5">
            {/* 标题区域 */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1 mr-3">
                {title}
              </h3>
              <button 
                ref={uploadButtonRef}
                onClick={handleUploadClick}
                className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                title="查看"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
            
            {/* 内容预览 - 要点列表形式 */}
            <div className="mb-6">
              {preview.split('\n').slice(0, 3).map((line, index) => (
                line.trim() && (
                  <div key={index} className="flex items-start mb-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="leading-relaxed">{line.trim()}</span>
                  </div>
                )
              ))}
            </div>
            
            {/* 底部信息 */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center">
                <div className={`w-1 h-6 ${getCardStatusColor(source)} rounded-full mr-3`}></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{category}</div>
                  <div className="text-xs text-gray-500">{author}</div>
                </div>
              </div>
              
              <button 
                ref={addButtonRef}
                onClick={handleAddClick}
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                title="添加到知识库"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>添加</span>
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
      
      <DetailModal 
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        item={props}
      />
    </>
  );
}
