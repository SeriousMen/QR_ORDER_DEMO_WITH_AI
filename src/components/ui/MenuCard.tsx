import { useState } from 'react';
import { type MenuItem } from '../../types/menu';
import { useCartStore } from '../../stores/cartStore';

interface MenuCardProps {
  item: MenuItem;
  rank?: number;
}

export const MenuCard = ({ item }: MenuCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  
  // 설명이 두 줄을 초과하는지 확인 (대략 80자 기준)
  const isLongDescription = item.description.length > 80;

  const handleAddToCart = () => {
    console.log('담기 버튼 클릭:', item.name);
    if (item.available) {
      addItem(item);
      console.log('아이템 추가됨:', item);
    }
  };

  return (
    <div className="bg-white border-2 border-black rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      {/* 모바일: 가로형, PC: 세로형 */}
      <div className="flex gap-4 sm:flex-col">
        {/* 메뉴 이미지 - PC에서는 상단에 */}
        <div className="flex-shrink-0 order-2 sm:order-1">
          <div className="w-32 h-32 sm:w-full sm:h-48 relative border-2 border-black rounded-lg overflow-hidden">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            
            {!item.available && (
              <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                <span className="bg-white text-black px-2 py-1 text-sm font-bold">
                  품절
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* 메뉴 정보 - PC에서는 하단에 */}
        <div className="flex-1 min-w-0 order-1 sm:order-2">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-black text-lg leading-tight">
              {item.name}
            </h3>
            {!item.available && (
              <span className="text-sm text-white bg-black px-2 py-1 font-bold ml-2 flex-shrink-0">
                품절
              </span>
            )}
          </div>
          
          <div className="mb-4 h-20 flex flex-col">
            <div className="flex-1 overflow-hidden">
              <p className={`text-gray-700 leading-relaxed ${
                !isExpanded && isLongDescription ? 'line-clamp-2' : ''
              }`}>
                {item.description}
              </p>
            </div>
            {isLongDescription && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-500 text-sm hover:text-gray-700 mt-1 font-medium self-start"
              >
                {isExpanded ? '접기' : '더보기'}
              </button>
            )}
          </div>
          
          <div className="mt-auto">
            <div className="mb-3">
              <span className="text-xl font-bold text-black">
                {item.price.toLocaleString()}원
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={!item.available}
              className={`w-full px-6 py-3 font-bold text-sm transition-all duration-300 rounded-lg ${
                item.available
                  ? 'bg-black text-white hover:bg-gray-800 active:scale-95'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {item.available ? '담기' : '품절'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};