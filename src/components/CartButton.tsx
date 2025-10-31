import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../stores/cartStore';

interface CartButtonProps {
  onClick: () => void;
}

export const CartButton = ({ onClick }: CartButtonProps) => {
  const totalItems = useCartStore(state => state.getTotalItems());

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
    >
      <div className="relative">
        <ShoppingCartIcon className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </div>
    </button>
  );
};