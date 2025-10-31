export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'dish' | 'drink';
  image?: string;
  available: boolean;
}

export const mockMenuItems: MenuItem[] = [
  // 음식
  {
    id: '1',
    name: '불고기 정식',
    description: '부드러운 불고기와 밥, 반찬이 함께 나오는 정식',
    price: 12000,
    category: 'dish',
    available: true,
  },
  {
    id: '2',
    name: '김치찌개',
    description: '매콤하고 시원한 김치찌개',
    price: 8000,
    category: 'dish',
    available: true,
  },
  {
    id: '3',
    name: '비빔밥',
    description: '신선한 나물과 고추장이 어우러진 비빔밥',
    price: 9000,
    category: 'dish',
    available: true,
  },
  {
    id: '4',
    name: '삼겹살 구이',
    description: '두툼한 삼겹살 구이',
    price: 15000,
    category: 'dish',
    available: false,
  },
  // 음료
  {
    id: '5',
    name: '아메리카노',
    description: '진한 에스프레소의 깊은 맛',
    price: 3000,
    category: 'drink',
    available: true,
  },
  {
    id: '6',
    name: '카페라떼',
    description: '부드러운 우유와 에스프레소의 조화',
    price: 4000,
    category: 'drink',
    available: true,
  },
  {
    id: '7',
    name: '오렌지 주스',
    description: '신선한 오렌지 100% 주스',
    price: 3500,
    category: 'drink',
    available: true,
  },
  {
    id: '8',
    name: '콜라',
    description: '시원한 콜라',
    price: 2000,
    category: 'drink',
    available: true,
  },
];

export const getMenuItems = (category?: 'dish' | 'drink'): MenuItem[] => {
  if (category) {
    return mockMenuItems.filter(item => item.category === category);
  }
  return mockMenuItems;
};

export const getMenuItem = (id: string): MenuItem | undefined => {
  return mockMenuItems.find(item => item.id === id);
};