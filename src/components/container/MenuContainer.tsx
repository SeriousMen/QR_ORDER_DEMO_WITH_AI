import { useState, useEffect, useRef } from 'react';
import { useMenuItems } from '../../hooks/useMenu';
import { MenuCard } from '../ui/MenuCard';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';

const CountryIcon = ({ country }: { country: string }) => {
  return (
    <img 
      src={`/src/assets/images/country/${country.toUpperCase()}.png`}
      alt={country}
      className="w-6 h-4 object-cover rounded border border-gray-300"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        target.nextElementSibling?.classList.remove('hidden');
      }}
    />
  );
};

const CountryFallback = ({ country }: { country: string }) => {
  return (
    <div className="w-6 h-4 bg-gray-200 border border-gray-300 rounded flex items-center justify-center hidden">
      <span className="text-xs font-bold text-gray-700">{country}</span>
    </div>
  );
};

export const MenuContainer = () => {
  const { t: translate } = useTranslation();
  const { languages, changeLanguage, getCurrentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setShowLanguageMenu(false);
  };
  
  const categories = [
    { id: 'all', title: translate('categories.all') },
    { id: 'dish', title: translate('categories.dish') },
    { id: 'drink', title: translate('categories.drink') }
  ] as const;
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  const { data: allMenuItems, isLoading, error } = useMenuItems();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 모든 섹션의 상태를 확인
        const allSections = entries
          .map(entry => ({
            index: sectionRefs.current.indexOf(entry.target as HTMLElement),
            ratio: entry.intersectionRatio,
            isIntersecting: entry.isIntersecting
          }))
          .filter(item => item.index !== -1)
          .sort((a, b) => a.index - b.index);
        
        // 30% 이상 보이는 섹션 중 가장 비율이 높은 것
        const visibleSections = allSections.filter(section => 
          section.isIntersecting && section.ratio >= 0.3
        );
        
        if (visibleSections.length > 0) {
          // 가장 많이 보이는 섹션을 활성화
          const mostVisible = visibleSections.reduce((prev, current) => 
            current.ratio > prev.ratio ? current : prev
          );
          setActiveTab(mostVisible.index);
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-80px 0px -80px 0px'
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [allMenuItems]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showLanguageMenu && !target.closest('.language-menu')) {
        setShowLanguageMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLanguageMenu]);

  const scrollToSection = (index: number) => {
    setActiveTab(index);
    const section = sectionRefs.current[index];
    if (section) {
      const headerHeight = 160; // 헤더 + 탭 높이
      const elementPosition = section.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-gray-600 py-12">
        <p className="text-lg">메뉴를 불러올 수 없습니다</p>
      </div>
    );
  }

  const dishItems = allMenuItems?.filter(item => item.category === 'dish') || [];
  const drinkItems = allMenuItems?.filter(item => item.category === 'drink') || [];

  return (
    <div>
      {/* 테이블 정보 */}
      <div className="px-6 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-black lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
              12
            </div>
            <div>
              <p className="text-lg font-bold text-black">{translate('table')} 12</p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                2{translate('orderingTogether')}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="text-right">
              <div className="bg-black text-white px-4 py-2 rounded-lg">
                <p className="text-sm font-bold">{translate('orderAvailable')}</p>
                <p className="text-xs opacity-80">{translate('open')}</p>
              </div>
            </div>
            
            {/* 언어 선택 */}
            <div className="relative language-menu">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <div className="relative">
                  <CountryIcon country={getCurrentLanguage().flag} />
                  <CountryFallback country={getCurrentLanguage().flag} />
                </div>
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 top-12 bg-white border-2 border-black rounded-lg shadow-xl z-50 min-w-[120px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg ${
                        getCurrentLanguage().code === lang.code ? 'bg-gray-100' : ''
                      }`}
                    >
                      <div className="relative">
                        <CountryIcon country={lang.flag} />
                        <CountryFallback country={lang.flag} />
                      </div>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b-2 border-black shadow-sm">
        <div className="flex px-6 lg:px-12">
          {categories.map((category, idx) => (
            <button
              key={category.id}
              onClick={() => scrollToSection(idx)}
              className={`relative py-4 px-8 text-base font-bold transition-all duration-300 ${
                activeTab === idx
                  ? 'text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {category.title}
              {activeTab === idx && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollContainerRef} className="px-6 lg:px-12">
        {/* 전체 메뉴 */}
        <div ref={(el) => { sectionRefs.current[0] = el }} className="py-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-black rounded-full"></div>
            <h2 className="text-3xl font-bold text-black">{translate('allMenu')}</h2>
          </div>
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
            {allMenuItems?.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* 음식 */}
        <div ref={(el) => { sectionRefs.current[1] = el }} className="py-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-black rounded-full"></div>
            <h2 className="text-3xl font-bold text-black">{translate('food')}</h2>
          </div>
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
            {dishItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* 음료 */}
        <div ref={(el) => { sectionRefs.current[2] = el }} className="py-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-black rounded-full"></div>
            <h2 className="text-3xl font-bold text-black">{translate('drinks')}</h2>
          </div>
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
            {drinkItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};