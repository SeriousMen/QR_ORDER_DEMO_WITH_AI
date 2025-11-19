export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'dish' | 'drink';
  image?: string;
  available: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type MenuCategory = 'dish' | 'drink';