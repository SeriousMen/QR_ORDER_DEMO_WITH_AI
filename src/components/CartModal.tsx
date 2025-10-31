import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../stores/cartStore';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();

  const handleOrder = () => {
    alert('주문이 완료되었습니다!');
    clearCart();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    장바구니
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {items.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">장바구니가 비어있습니다</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-500">
                              {item.price.toLocaleString()}원
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <MinusIcon className="w-4 h-4" />
                            </button>
                            
                            <span className="w-8 text-center">{item.quantity}</span>
                            
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <PlusIcon className="w-4 h-4" />
                            </button>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">총 금액:</span>
                        <span className="text-lg font-bold text-blue-600">
                          {getTotalPrice().toLocaleString()}원
                        </span>
                      </div>
                      
                      <button
                        onClick={handleOrder}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
                      >
                        주문하기
                      </button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};