import { createBrowserRouter } from 'react-router-dom';
import { MenuPage } from '../pages/MenuPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MenuPage />,
  },
]);