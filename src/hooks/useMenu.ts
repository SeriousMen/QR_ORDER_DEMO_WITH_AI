import { useQuery } from '@tanstack/react-query';
import { fetchMenuItems, fetchMenuItem } from '../libs/api';
import { type MenuCategory } from '../types/menu';

export const useMenuItems = (category?: MenuCategory) => {
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