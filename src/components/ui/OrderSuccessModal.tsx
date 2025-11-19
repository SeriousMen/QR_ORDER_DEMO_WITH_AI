import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber?: string;
}

export const OrderSuccessModal = ({ isOpen, onClose, orderNumber = "001" }: OrderSuccessModalProps) => {
  return createPortal(
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[10001]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white border-4 border-black rounded-2xl shadow-2xl transition-all">
                <div className="p-8 text-center">
                  {/* 성공 아이콘 */}
                  <div className="mx-auto flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <CheckCircleIcon className="w-12 h-12 text-green-600" />
                  </div>
                  
                  {/* 제목 */}
                  <Dialog.Title className="text-2xl font-bold text-black mb-4">
                    주문이 완료되었습니다!
                  </Dialog.Title>
                  
                  {/* 주문 번호 */}
                  <div className="bg-gray-50 border-2 border-black rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-1">주문번호</p>
                    <p className="text-xl font-bold text-black">#{orderNumber}</p>
                  </div>
                  
                  {/* 안내 메시지 */}
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    주문이 접수되었습니다.<br />
                    잠시만 기다려주시면 맛있는 음식을<br />
                    준비해드리겠습니다.
                  </p>
                  
                  {/* 확인 버튼 */}
                  <button
                    onClick={onClose}
                    className="w-full bg-black text-white py-4 font-bold text-lg rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]"
                  >
                    확인
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>,
    document.body
  );
};