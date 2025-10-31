import { useQuery } from '@tanstack/react-query';
import { getMenuItems, getMenuItem, type MenuItem } from '../data/mockData';

// Mock API 함수들
const fetchMenuItems = async (category?: 'dish' | 'drink'): Promise<MenuItem[]> => {
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise(resolve => setTimeout(resolve, 500));
  return getMenuItems(category);
};

const fetchMenuItem = async (id: string): Promise<MenuItem | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return getMenuItem(id);
};

export const useMenuItems = (category?: 'dish' | 'drink') => {
  return useQuery({
    queryKey: ['menuItems', category],
    queryFn: () => fetchMenuItems(category),
  });
};

export const useMenuItem = (id: string) => {
  return useQuery({
    queryKey: ['menuItem', id],
    queryFn: () => fetchMenuItem(id),
    enabled: !!id,
  });
};