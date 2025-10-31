import { useState, useEffect, useRef } from 'react';
import { useMenuItems } from '../hooks/useMenu';
import { MenuCard } from '../components/MenuCard';
import { CartButton } from '../components/CartButton';
import { CartModal } from '../components/CartModal';

const categories = [
  { id: 'event', title: '리뷰 이벤트' },
  { id: 'dish', title: '처음 왔다면 꼭 추천' },
  { id: 'drink', title: '메뉴 🌙' }
] as const;

export const MenuPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  const { data: allMenuItems, isLoading, error } = useMenuItems();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (entry.isIntersecting && index !== -1) {
            setActiveTab(index);
          }
        });
      },
      { 
        root: container,
        threshold: 0.3,
        rootMargin: '-20% 0px -50% 0px'
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    const section = sectionRefs.current[index];
    if (section && scrollContainerRef.current) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        메뉴를 불러오는데 실패했습니다.
      </div>
    );
  }

  const dishItems = allMenuItems?.filter(item => item.category === 'dish') || [];
  const drinkItems = allMenuItems?.filter(item => item.category === 'drink') || [];
  const topItems = allMenuItems?.slice(0, 3) || [];

  return (
    <div className="flex flex-col h-screen">
      {/* 고정 탭 */}
      <div className="bg-white border-b border-gray-200 px-2 py-3 flex-shrink-0">
        <div className="flex justify-around">
          {categories.map((category, idx) => (
            <button
              key={category.id}
              onClick={() => scrollToSection(idx)}
              className={`py-2 px-1 font-medium text-sm transition-all duration-200 relative ${
                activeTab === idx
                  ? 'text-black'
                  : 'text-gray-400'
              }`}
            >
              {category.title}
              {activeTab === idx && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-3 py-4"
      >
        <div
          ref={(el) => { sectionRefs.current[0] = el }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-black mb-4 text-center">리뷰 이벤트</h2>
          <div className="space-y-4">
            {topItems.map((item, index) => (
              <MenuCard key={item.id} item={item} rank={index + 1} />
            ))}
          </div>
        </div>

        <div
          ref={(el) => { sectionRefs.current[1] = el }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-black mb-4 text-center">처음 왔다면 꼭 추천</h2>
          <div className="space-y-4">
            {dishItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div
          ref={(el) => { sectionRefs.current[2] = el }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-black mb-4 text-center">메뉴 🌙</h2>
          <div className="space-y-4">
            {drinkItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <CartButton onClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};