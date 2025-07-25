'use client';

interface SidebarProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

const categories = [
  { id: 'math', name: '数学' },
  { id: 'physics', name: '物理' },
  { id: 'chemistry', name: '化学' },
  { id: 'biology', name: '生物' },
  { id: 'chinese', name: '语文' },
  { id: 'english', name: '英语' },
  { id: 'history', name: '历史' },
  { id: 'geography', name: '地理' },
  { id: 'politics', name: '政治' }
];

export default function Sidebar({ selectedCategories, setSelectedCategories, showSidebar, setShowSidebar }: SidebarProps) {
  const toggleCategory = (categoryName: string) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
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
        
        <div className="space-y-1">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.name);
            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.name)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-all duration-200 ${
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
