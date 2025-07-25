'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    author: string;
    preview: string;
    category: string;
    description: string;
    views: number;
    likes: number;
    type: 'cards' | 'knowledge';
    source?: 'text' | 'voice' | 'image' | 'shared';
    addedDate?: string;
  };
}

export default function DetailModal({ isOpen, onClose, item }: DetailModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '未知日期';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPreviewContent = () => {
    if (item.type === 'knowledge') {
      return (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600">知识库文档预览</p>
          <p className="text-sm text-gray-500 mt-2">{item.preview}</p>
        </div>
      );
    } else {
      // 卡片类型显示文本预览
      const lines = item.preview.split('\n').slice(0, 5);
      return (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2">
            {lines.map((line, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50">
      {/* 背景遮罩 */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleBackdropClick}
      />
      
      {/* 桌面端模态窗口 */}
      <div className="hidden md:flex items-center justify-center min-h-screen p-4">
        <div 
          className={`relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 内容区域 */}
          <div className="p-6 overflow-y-auto max-h-[90vh]">
            {/* 标题 */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4 pr-12">{item.title}</h1>
            
            {/* 作者信息和操作按钮 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">{item.author}</span>
                <span>•</span>
                <span>{formatDate(item.addedDate)}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors h-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  分享
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors h-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  查看
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors h-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  添加
                </button>
              </div>
            </div>

            {/* 描述部分 */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">描述</h2>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* 预览部分 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">预览</h2>
              {getPreviewContent()}
            </div>
          </div>
        </div>
      </div>

      {/* 移动端从下往上飞入页面 */}
      <div className="md:hidden">
        <div 
          className={`fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out ${
            isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ height: 'calc(100vh - 2rem)', top: '2rem' }}
        >
          {/* 拖拽指示器 */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 内容区域 */}
          <div className="px-6 pb-6 overflow-y-auto" style={{ height: 'calc(100% - 3rem)' }}>
            {/* 标题 */}
            <h1 className="text-xl font-bold text-gray-900 mb-4 pr-12">{item.title}</h1>
            
            {/* 作者信息和操作按钮 */}
            <div className="mb-6">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="font-medium">{item.author}</span>
                <span>•</span>
                <span>{formatDate(item.addedDate)}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-1 justify-center h-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  分享
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-1 justify-center h-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  查看
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex-1 justify-center h-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  添加
                </button>
              </div>
            </div>

            {/* 描述部分 */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">描述</h2>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* 预览部分 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">预览</h2>
              {getPreviewContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}