import {type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-sm bg-white shadow-lg">
        <header className="bg-white border-b border-gray-200 px-4 py-4 text-center">
          <h1 className="text-xl font-bold text-black">한식과 카페</h1>
          <p className="text-xs text-gray-600 mt-1">멤버 2명과 함께 주문 중</p>
        </header>
        
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};