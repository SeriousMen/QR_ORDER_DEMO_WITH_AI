import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCartIcon, XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../../stores/cartStore';
import { OrderSuccessModal } from './OrderSuccessModal';

// Tailwind 클래스 미리 선언 (빌드에 포함되도록)
// bg-white bg-red-500 text-red-500 bg-gray-50 bg-gray-100 hover:bg-gray-100 hover:bg-gray-200

export const Cart = () => {
  const { t: translate } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const items = useCartStore(state => state.items);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const clearCart = useCartStore(state => state.clearCart);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // if (totalItems === 0) return null;
  if (totalItems === 0 && !showOrderSuccess) return null;

  const handleOrder = () => {
    
    setIsExpanded(false);
    setShowOrderSuccess(true);
    clearCart();

  };

  const handleOrderSuccessClose = () => {
    setShowOrderSuccess(false);
  };

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 w-80 z-[9999] bottom-4 sm:left-auto sm:right-4 sm:transform-none sm:w-96">
      {/* 장바구니 요약 버튼 */}
      {!isExpanded && (
        <div className="mx-4 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border-2 border-black">
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all duration-300 rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center font-bold rounded-full">
                  {totalItems}
                </span>
              </div>
              <span className="font-medium text-gray-900">{translate('cart')} ({totalItems}개)</span>
            </div>
            <span className="font-bold text-gray-900">{getTotalPrice().toLocaleString()}원</span>
          </button>
        </div>
      )}

      {/* 장바구니 상세 */}
      {isExpanded && (
        <>
          {/* 배경 오버레이 */}
          <div className="fixed inset-0 bg-opacity-30 -z-10" onClick={() => setIsExpanded(false)} />
          
          <div className="mx-4 bg-white shadow-2xl rounded-2xl border-2 border-black max-h-96 overflow-hidden relative z-10">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b-2 border-black bg-gray-50">
            <h3 className="text-lg font-bold text-black">{translate('cart')}</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* 메뉴 리스트 */}
          <div className="max-h-48 overflow-y-auto p-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded">
                <div className="flex-1">
                  <h4 className="font-bold text-black">{item.name}</h4>
                  <p className="text-gray-600 text-sm">{item.price.toLocaleString()}원</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-black rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <MinusIcon className="w-3 h-3" />
                    </button>
                    <span className="px-2 py-1 text-sm font-bold min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <PlusIcon className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <XMarkIcon className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 결제 영역 */}
          <div className="border-t-2 border-black p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-black">{translate('totalAmount', '총 결제금액')}</span>
              <span className="text-lg font-bold text-black">
                {getTotalPrice().toLocaleString()}원
              </span>
            </div>
            
            <button
              onClick={handleOrder}
              className="w-full bg-black text-white py-3 font-bold hover:bg-gray-800 transition-all duration-300 rounded-lg hover:scale-[1.02]"
            >
              {translate('checkout', '결제하기')}
            </button>
          </div>
        </div>
        </>
      )}
      
      {/* 주문 완료 모달 */}
      {showOrderSuccess && (
        <OrderSuccessModal 
          isOpen={showOrderSuccess}
          onClose={handleOrderSuccessClose}
          orderNumber={String(Date.now()).slice(-3)}
        />
      )}
      
    </div>
  );
};