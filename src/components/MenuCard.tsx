import { PlusIcon } from '@heroicons/react/24/outline';
import { type MenuItem } from '../data/mockData';
import { useCartStore } from '../stores/cartStore';

interface MenuCardProps {
  item: MenuItem;
  rank?: number;
}

export const MenuCard = ({ item, rank }: MenuCardProps) => {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    if (item.available) {
      addItem(item);
    }
  };

  return (
    <div className={`bg-white p-3 ${!item.available ? 'opacity-50' : ''}`}>
      {/* 순위 및 제목 */}
      <div className="flex items-start gap-2 mb-2">
        {rank && (
          <span className="text-base font-bold text-black">{rank}</span>
        )}
        <h3 className="text-base font-bold text-black leading-tight">{item.name}</h3>
      </div>
      
      {/* 이미지 */}
      <div className="mb-3 relative">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-40 object-cover rounded"
          />
        ) : (
          <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded">
            <span className="text-3xl">🍽️</span>
          </div>
        )}
        
        {/* 품절 표시 */}
        {!item.available && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded">
            <span className="bg-white text-black px-2 py-1 rounded text-xs font-bold">
              품절
            </span>
          </div>
        )}
      </div>
      
      {/* 설명 */}
      <p className="text-gray-700 text-xs mb-3 leading-relaxed">{item.description}</p>
      
      {/* 가격 및 버튼 */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
        <span className="text-base font-bold text-black">
          {item.price.toLocaleString()}원
        </span>
        
        <button
          onClick={handleAddToCart}
          disabled={!item.available}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
            item.available
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {item.available ? '담기' : '품절'}
        </button>
      </div>
    </div>
  );
};