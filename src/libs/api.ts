import { type MenuItem, type MenuCategory } from '../types/menu';

// Mock 데이터
const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: '불고기 정식',
    description: '부드러운 불고기와 밥, 반찬이 함께 나오는 정식',
    price: 12000,
    category: 'dish',
    image: 'https://images.unsplash.com/photo-1718777791239-c473e9ce7376?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: '2',
    name: '김치찌개',
    description: '매콤하고 시원한 김치찌개',
    price: 8000,
    category: 'dish',
    image: 'https://images.unsplash.com/photo-1760228865341-675704c22a5b?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: '3',
    name: '비빔밥',
    description: '신선한 나물과 고추장이 어우러진 비빔밥',
    price: 9000,
    category: 'dish',
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: '4',
    name: '삼겹살 구이',
    description: '두툼한 삼겹살 구이',
    price: 15000,
    category: 'dish',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    available: false,
  },
  {
    id: '5',
    name: '아메리카노',
    description: '진한 에스프레소의 깊은 맛',
    price: 3000,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: '6',
    name: '카페라떼',
    description: '부드러운 우유와 에스프레소의 조화',
    price: 4000,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: '7',
    name: '오렌지 주스',
    description: '신선한 오렌지 100% 주스',
    price: 3500,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: '8',
    name: '콜라',
    description: '시원한 콜라',
    price: 2000,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop',
    available: true,
  },
];

export const fetchMenuItems = async (category?: MenuCategory): Promise<MenuItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (category) {
    return mockMenuItems.filter(item => item.category === category);
  }
  return mockMenuItems;
};

export const fetchMenuItem = async (id: string): Promise<MenuItem | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMenuItems.find(item => item.id === id);
};